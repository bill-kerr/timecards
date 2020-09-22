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

// CostCode represents the data for a specific cost code.
type CostCode struct {
	TimecardCostCodeID string  `json:"timeCardCostCodeId"`
	CostCodeID         string  `json:"costCodeId"`
	Code               string  `json:"costCodeCode"`
	Description        string  `json:"costCodeDescription"`
	IsRework           bool    `json:"isRework"`
	IsTM               bool    `json:"isTm"`
	Quantity           float32 `json:"quantity"`
	Unit               string  `json:"unitOfMeasure"`
}

// TimecardEmployee represents the data for an employee on a specific timecard.
type TimecardEmployee struct {
	TimecardEmployeeID  string          `json:"timeCardEmployeeId"`
	EmployeeID          string          `json:"employeeId"`
	EmployeeCode        string          `json:"employeeCode"`
	EmployeeDescription string          `json:"employeeDescription"`
	PayClassID          string          `json:"payClassId"`
	PayClassCode        string          `json:"payClassCode"`
	PayClassDescription string          `json:"payClassDescription"`
	RegularHours        []EmployeeHours `json:"regularHours"`
	OvertimeHours       []EmployeeHours `json:"overtimeHours"`
	DoubletimeHours     []EmployeeHours `json:"doubleOvertimeHours"`
}

// EmployeeHours represents the data for employee hours on a given timecard.
type EmployeeHours struct {
	TimecardCostCodeID string  `json:"timeCardCostCodeId"`
	TagCode            string  `json:"tagCode"`
	Hours              float32 `json:"hours"`
}

// Timecard represents the data for a specific timecard.
type Timecard struct {
	ID                      string             `json:"id"`
	ForemanID               string             `json:"foremanId"`
	ForemanCode             string             `json:"foremanCode"`
	ForemanDescription      string             `json:"foremanDescription"`
	JobID                   string             `json:"jobId"`
	JobCode                 string             `json:"jobCode"`
	JobDescription          string             `json:"jobDescription"`
	BusinessUnitID          string             `json:"businessUnitId"`
	BusinessUnitCode        string             `json:"businessUnitCode"`
	BusinessUnitDescription string             `json:"businessUnitDescription"`
	Date                    string             `json:"date"`
	Revision                int                `json:"revision"`
	IsApproved              bool               `json:"isApproved"`
	ApprovedByID            string             `json:"approvedById"`
	IsReviewed              bool               `json:"isReviewed"`
	ReviewedByID            string             `json:"reviewedById"`
	IsAccepted              bool               `json:"isAccepted"`
	AcceptedByID            string             `json:"acceptedById"`
	IsRejected              bool               `json:"isRejected"`
	RejectedByID            string             `json:"rejectedById"`
	SentToPayrollRevision   int                `json:"sentToPayrollRevision"`
	SentToPayrollDateTime   string             `json:"sentToPayrollDateTime"`
	LastModifiedDateTime    string             `json:"lastModifiedDateTime"`
	CostCodes               []CostCode         `json:"costCodes"`
	Employees               []TimecardEmployee `json:"employees"`
}

// GetTimecardSummaries returns all timecard summaries within a date range.
func (c *Client) GetTimecardSummaries(querystring string) ([]TimecardSummary, error) {
	response := TimecardSummaryResponse{}
	path := "/timeCardInfo" + querystring
	if _, err := c.get(path, &response); err != nil {
		return nil, err
	}

	return response.Summaries, nil
}

// GetTimecard returns the data for a timecard with the specified ID.
func (c *Client) GetTimecard(ID string) (Timecard, error) {
	timecard := Timecard{}
	path := "/timeCards/" + ID
	if _, err := c.get(path, &timecard); err != nil {
		return timecard, err
	}

	return timecard, nil
}
