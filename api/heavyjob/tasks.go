package heavyjob

import (
	"time"

	"github.com/bk7987/timecards/employees"
	"github.com/bk7987/timecards/jobs"
	"github.com/go-co-op/gocron"
)

// ScheduleConfig holds configuration options for the update operations.
type ScheduleConfig struct {
	HCSSTokenUpdateInterval uint64
	JobUpdateInterval       uint64
	EmployeeUpdateInterval  uint64
}

// ScheduleRefresh schedules a data refresh to be run periodically. The interval parameter is in minutes.
func ScheduleRefresh(scheduleConfig ScheduleConfig) {
	schedule := gocron.NewScheduler(time.UTC)
	client := newClient()

	schedule.Every(scheduleConfig.HCSSTokenUpdateInterval).Minutes().Do(func() {
		client = newClient()
	})
	schedule.Every(scheduleConfig.JobUpdateInterval).Minutes().Do(func() {
		client.refreshJobs()
	})
	schedule.Every(scheduleConfig.EmployeeUpdateInterval).Minutes().Do(func() {
		client.refreshEmployees()
	})

	schedule.StartAsync()
}

// refreshJobs refreshes all of the jobs in the database from the HeavyJob API.
func (c *Client) refreshJobs() error {
	hjJobs, err := c.GetJobs()
	if err != nil {
		return err
	}
	return jobs.UpdateOrSaveMany(transformJobs(hjJobs))
}

// refreshEmployees refreshes all of the employees from the HeavyJob API.
func (c *Client) refreshEmployees() error {
	hjEmployees, err := c.GetEmployees()
	if err != nil {
		return err
	}
	return employees.UpdateOrSaveMany(transformEmployees(hjEmployees))
}
