package heavyjob

import (
	"log"
	"time"

	"github.com/bk7987/timecards/jobs"
	"github.com/go-co-op/gocron"
)

// ScheduleRefresh schedules a data refresh to be run periodically. The interval parameter is in minutes.
func ScheduleRefresh(interval uint64) *gocron.Job {
	schedule := gocron.NewScheduler(time.UTC)
	task, err := schedule.Every(interval).Minutes().Do(RefreshData)
	if err != nil {
		log.Fatal(err.Error())
	}

	schedule.StartAsync()
	return task
}

// RefreshData is the task that runs periodically to refresh the database data from the HeavyJob API.
func RefreshData() error {
	client := newClient()
	err := refreshJobs(client)
	return err
}

// refreshJobs refreshes all of the jobs in the database from the HeavyJob API.
func refreshJobs(c *Client) error {
	hjJobs, err := c.GetJobs()
	if err != nil {
		return err
	}
	return jobs.UpdateOrSaveMany(transformMany(hjJobs))
}
