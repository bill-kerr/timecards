package heavyjob

// TimecardSummary represents the summary data for a specific timecard.
type TimecardSummary struct {
	ID string `json:"id"`
	Code string `json:"code"`
	Description string `json:"description"`
	BusinessUnitID string `json:"business"`
	Status string `json:"status"`
}

// GetTimecardSummaries returns all timecard summaries within a date range.
func (c *Client) GetTimecardSummaries {
	
}
