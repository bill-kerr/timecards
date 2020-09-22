package heavyjob

import "github.com/bk7987/timecards/jobs"

// Job represents a single project.
type Job struct {
	ID             string `json:"id"`
	Code           string `json:"code"`
	Description    string `json:"description"`
	BusinessUnitID string `json:"businessUnitId"`
	Status         string `json:"status"`
}

// GetJobs returns all jobs owned by the company.
func (c *Client) GetJobs() ([]Job, error) {
	jobs := []Job{}
	_, err := c.get("/jobs", &jobs)
	return jobs, err
}

// Transform translates the HeavyJob API job object to the Timecards job model.
func (j *Job) Transform() jobs.JobModel {
	return jobs.JobModel{
		ID:          j.ID,
		Description: j.Description,
		JobNumber:   j.Code,
	}
}

// transformJobs returns a slice of transformed Job models.
func transformJobs(hjJobs []Job) []jobs.JobModel {
	transformed := []jobs.JobModel{}
	for _, job := range hjJobs {
		transformed = append(transformed, jobs.JobModel{
			ID:          job.ID,
			Description: job.Description,
			JobNumber:   job.Code,
		})
	}
	return transformed
}
