package heavyjob

// TimecardSummary represents the summary data for a specific timecard.
type TimecardSummary struct {
	ID                          string `json:"id"`
	ForemanID                   string `json:"foremanId"`
	JobID                       string `json:"jobId"`
	BusinessUnitID              string `json:"businessUnitId"`
	Date                        string `json:"date"`
	Revision                    int    `json:"revision"`
	LastModifiedDateTime        string `json:"lastModifiedDateTime"`
	LastModifiedPreciseDateTime string `json:"lastModifiedPreciseDateTime"`
	SentToPayrollDateTime       string `json:"sentToPayrollDateTime"`
	SentToPayrollRevision       int    `json:"sentToPayrollRevision"`
	IsApproved                  bool   `json:"isApproved"`
}

// TimecardSummaryResponse represents the shape of the response from the Heavyjob API.
type TimecardSummaryResponse struct {
	Summaries []TimecardSummary `json:"results"`
}

// GetTimecardSummaries returns all timecard summaries within a date range.
func (c *Client) GetTimecardSummaries(querystring string) ([]TimecardSummary, error) {
	response := TimecardSummaryResponse{}
	url := "/timeCardInfo" + querystring
	_, err := c.get(url, &response)
	if err != nil {
		return nil, err
	}

	return response.Summaries, nil
}
