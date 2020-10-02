package heavyjob

import (
	"log"
	"time"

	"github.com/bk7987/timecards/common"
	"github.com/bk7987/timecards/employees"
	"github.com/bk7987/timecards/equipment"
	"github.com/bk7987/timecards/jobs"
	"github.com/bk7987/timecards/timecards"
	"github.com/go-co-op/gocron"
)

// ScheduleConfig holds configuration options for the update operations.
type ScheduleConfig struct {
	HCSSTokenRefreshInterval uint64
	JobRefreshInterval       uint64
	EmployeeRefreshInterval  uint64
	EquipmentRefreshInterval uint64
	TimecardRefreshInterval  uint64
}

var client *Client

// ScheduleRefresh schedules a data refresh to be run periodically. The interval parameter is in minutes.
func ScheduleRefresh(scheduleConfig ScheduleConfig) {
	schedule := gocron.NewScheduler(time.UTC)
	client = newClient()

	schedule.Every(scheduleConfig.HCSSTokenRefreshInterval).Minutes().Do(func() {
		log.Println("Refreshing access token...")
		client = newClient()
	})
	schedule.Every(scheduleConfig.JobRefreshInterval).Minutes().Do(client.refreshJobs)
	schedule.Every(scheduleConfig.EmployeeRefreshInterval).Minutes().Do(client.refreshEmployees)
	schedule.Every(scheduleConfig.EquipmentRefreshInterval).Minutes().Do(client.refreshEquipment)
	schedule.Every(scheduleConfig.TimecardRefreshInterval).Minutes().StartImmediately().Do(client.refreshTimecards)

	schedule.StartAsync()
}

// refreshJobs refreshes all of the jobs in the database from the HeavyJob API.
func (c *Client) refreshJobs() error {
	log.Println("Refreshing jobs...")
	hjJobs, err := c.GetJobs()
	if err != nil {
		return err
	}

	return jobs.UpdateOrSaveMany(transformJobs(hjJobs))
}

// refreshEmployees refreshes all of the employees from the HeavyJob API.
func (c *Client) refreshEmployees() error {
	log.Println("Refreshing employees...")
	hjEmployees, err := c.GetEmployees()
	if err != nil {
		return err
	}

	return employees.UpdateOrSaveMany(transformEmployees(hjEmployees))
}

// refreshEquipment refreshes all of the equipment from the HeavyJob API.
func (c *Client) refreshEquipment() error {
	log.Println("Refreshing equipment...")
	hjEquipment, err := c.GetEquipment()
	if err != nil {
		return err
	}

	return equipment.UpdateOrSaveMany(transformEquipment(hjEquipment))
}

// refreshTimecards refreshes all of the timecard data using the HeavyJob API.
func (c *Client) refreshTimecards() error {
	log.Println("Refreshing timecards...")
	summaries, err := c.GetTimecardSummaries(TimecardFilters{
		StartDate: common.TwoSundaysAgo(time.Now().Local()).Format("2006-01-02"),
	})
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
