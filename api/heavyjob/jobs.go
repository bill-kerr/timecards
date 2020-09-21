package heavyjob

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
