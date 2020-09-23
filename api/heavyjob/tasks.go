package heavyjob

import (
	"time"

	"github.com/bk7987/timecards/employees"
	"github.com/bk7987/timecards/jobs"
	"github.com/bk7987/timecards/timecards"
	"github.com/go-co-op/gocron"
)

// ScheduleConfig holds configuration options for the update operations.
type ScheduleConfig struct {
	HCSSTokenRefreshInterval uint64
	JobRefreshInterval       uint64
	EmployeeRefreshInterval  uint64
	TimecardRefreshInterval  uint64
}

// ScheduleRefresh schedules a data refresh to be run periodically. The interval parameter is in minutes.
func ScheduleRefresh(scheduleConfig ScheduleConfig) {
	schedule := gocron.NewScheduler(time.UTC)
	client := newClient()

	schedule.Every(scheduleConfig.HCSSTokenRefreshInterval).Minutes().Do(func() {
		client = newClient()
	})
	schedule.Every(scheduleConfig.JobRefreshInterval).Minutes().Do(client.refreshJobs)
	schedule.Every(scheduleConfig.EmployeeRefreshInterval).Minutes().Do(client.refreshEmployees)
	schedule.Every(scheduleConfig.TimecardRefreshInterval).Minutes().Do(client.refreshTimecards)

	schedule.StartAsync()
}

// refreshJobs refreshes all of the jobs in the database from the HeavyJob API.
func (c *Client) refreshJobs() error {
	hjJobs, err := c.GetJobs()
	if err != nil {
		return err
	}

	jobs.UpdateOrSaveMany(transformJobs(hjJobs))
	return nil
}

// refreshEmployees refreshes all of the employees from the HeavyJob API.
func (c *Client) refreshEmployees() error {
	hjEmployees, err := c.GetEmployees()
	if err != nil {
		return err
	}

	employees.UpdateOrSaveMany(transformEmployees(hjEmployees))
	return nil
}

// refreshTimecards refreshes all of the timecard data using the HeavyJob API.
func (c *Client) refreshTimecards() error {
	summaries, err := c.GetTimecardSummaries("?startDate=2020-09-23")
	if err != nil {
		return err
	}

	hjTimecards := []Timecard{}
	for _, summary := range summaries {
		tc, _ := c.GetTimecard(summary.ID)
		hjTimecards = append(hjTimecards, tc)
	}

	timecards.UpdateOrSaveManyTimecards(transformTimecards(hjTimecards))
	return nil
}
