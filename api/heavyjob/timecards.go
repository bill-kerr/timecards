package heavyjob

import (
	"github.com/bk7987/timecards/common"
	"github.com/bk7987/timecards/timecards"
	"github.com/gofrs/uuid"
)

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
	Metadata  SummaryMetadata   `json:"metadata"`
}

// SummaryMetadata represents the metadata portion of the HeavyJob API timecard summary response.
type SummaryMetadata struct {
	NextCursor string `json:"nextCursor"`
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

// TimecardEquipment represents the data for a piece of equipment on a given timecard.
type TimecardEquipment struct {
	TimecardEquipmentID      string           `json:"timeCardEquipmentId"`
	EquipmentID              string           `json:"equipmentId"`
	EquipmentCode            string           `json:"equipmentCode"`
	EquipmentDescription     string           `json:"equipmentDescription"`
	LinkedTimecardEmployeeID string           `json:"linkedTimeCardEmployeeId"`
	TotalHours               []EquipmentHours `json:"totalHours"`
	OwnershipHours           []EquipmentHours `json:"ownershipHours"`
	OperatingHours           []EquipmentHours `json:"operatingHours"`
}

// EquipmentHours represents the data for equipment hours on a given timecard.
type EquipmentHours struct {
	TimecardCostCodeID string  `json:"timeCardCostCodeId"`
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

// TimecardFilters represents the filters that can be applied when fetching timecards from the HeavyJob API.
type TimecardFilters struct {
	JobID         string `url:"jobId,omitempty"`
	ForemanID     string `url:"foremanId,omitempty"`
	EmployeeID    string `url:"employeeId,omitempty"`
	StartDate     string `url:"startDate,omitempty"`
	EndDate       string `url:"endDate,omitempty"`
	ModifiedSince string `url:"modifiedSince,omitempty"`
	Cursor        string `url:"cursor,omitempty"`
}

// GetTimecardSummaries recursively returns all timecard summaries within a date range.
func (c *Client) GetTimecardSummaries(filters TimecardFilters) ([]TimecardSummary, error) {
	querystring, err := common.BuildQuery(filters)
	if err != nil {
		return nil, err
	}

	path := "/timeCardInfo" + querystring
	response := TimecardSummaryResponse{}
	if _, err := c.get(path, &response); err != nil {
		return nil, err
	}
	summaries := response.Summaries

	if response.Metadata.NextCursor != "" {
		newFilters := filters
		newFilters.Cursor = response.Metadata.NextCursor
		nextSummaries, err := c.GetTimecardSummaries(newFilters)
		if err != nil {
			return nil, err
		}
		summaries = append(summaries, nextSummaries...)
	}

	return summaries, nil
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

// transformTimecards transforms timecards from HeavyJob's API to new Timecard models
func transformTimecards(hjTimecards []Timecard) []timecards.Timecard {
	transformed := []timecards.Timecard{}
	for _, tc := range hjTimecards {
		transformed = append(transformed, timecards.Timecard{
			ID:                    tc.ID,
			JobID:                 tc.JobID,
			ForemanID:             tc.ForemanID,
			Date:                  tc.Date,
			Revision:              tc.Revision,
			IsApproved:            tc.IsApproved,
			IsReviewed:            tc.IsReviewed,
			IsAccepted:            tc.IsAccepted,
			IsRejected:            tc.IsRejected,
			SentToPayrollRevision: tc.SentToPayrollRevision,
			SentToPayrollDateTime: tc.SentToPayrollDateTime,
			LastModifiedDateTime:  tc.LastModifiedDateTime,
			TimecardCostCodes:     transformCostCodes(tc.CostCodes, tc.ID),
			TimecardEmployees:     transformTimecardEmployees(tc.Employees, tc.ID, tc.Date),
		})
	}
	return transformed
}

// transformCostCodes transforms cost codes from HeavyJob's API to new TimecardCostCode objects
func transformCostCodes(hjCostCodes []CostCode, timecardID string) []timecards.TimecardCostCode {
	transformed := []timecards.TimecardCostCode{}
	for _, cc := range hjCostCodes {
		transformed = append(transformed, timecards.TimecardCostCode{
			ID:          cc.TimecardCostCodeID,
			TimecardID:  timecardID,
			Code:        cc.Code,
			Description: cc.Description,
			Quantity:    cc.Quantity,
			Unit:        cc.Unit,
		})
	}
	return transformed
}

// transformTimecardEmployees transforms TimecardEmployees from HeavyJob's API to new TimecardEmployee objects.
func transformTimecardEmployees(hjEmployees []TimecardEmployee, timecardID string, timecardDate string) []timecards.TimecardEmployee {
	transformed := []timecards.TimecardEmployee{}
	for _, em := range hjEmployees {
		transformed = append(transformed, timecards.TimecardEmployee{
			ID:           em.TimecardEmployeeID,
			TimecardID:   timecardID,
			EmployeeID:   em.EmployeeID,
			PayClassCode: em.PayClassCode,
			Hours:        transformEmployeeHours(em),
			TimecardDate: timecardDate,
		})
	}
	return transformed
}

// transformEmployeeHours transforms EmployeeHours from HeavyJob's API to new EmployeeHour objects.
func transformEmployeeHours(hjEmployee TimecardEmployee) []timecards.EmployeeHours {
	transformed := []timecards.EmployeeHours{}

	for _, hours := range hjEmployee.RegularHours {
		employeeHours, err := makeHours(hjEmployee.TimecardEmployeeID, hours, "regular")
		if err != nil {
			continue
		}
		transformed = append(transformed, employeeHours)
	}

	for _, hours := range hjEmployee.OvertimeHours {
		employeeHours, err := makeHours(hjEmployee.TimecardEmployeeID, hours, "overtime")
		if err != nil {
			continue
		}
		transformed = append(transformed, employeeHours)
	}

	for _, hours := range hjEmployee.DoubletimeHours {
		employeeHours, err := makeHours(hjEmployee.TimecardEmployeeID, hours, "doubletime")
		if err != nil {
			continue
		}
		transformed = append(transformed, employeeHours)
	}

	return transformed
}

func makeHours(timecardEmployeeID string, hjHours EmployeeHours, hoursType string) (timecards.EmployeeHours, error) {
	ID, err := uuid.NewV4()
	if err != nil {
		return timecards.EmployeeHours{}, err
	}
	return timecards.EmployeeHours{
		ID:                 ID.String(),
		TimecardEmployeeID: timecardEmployeeID,
		Hours:              hjHours.Hours,
		Type:               hoursType,
		TagCode:            hjHours.TagCode,
		TimecardCostCodeID: hjHours.TimecardCostCodeID,
	}, nil
}

// transformTimecardEquipment transforms TimecardEquipment from HeavyJob's API to timecards.TimecardEquipment objects.
func transformTimecardEquipment(hjEquipment []TimecardEquipment, timecardID string) []timecards.TimecardEquipment {
	transformed := []timecards.TimecardEquipment{}
	for _, eq := range hjEquipment {
		transformed = append(transformed, timecards.TimecardEquipment{
			ID:          eq.TimecardEquipmentID,
			TimecardID:  timecardID,
			EquipmentID: eq.EquipmentID,
			Hours:       transformEquipmentHours(eq.TotalHours, eq.TimecardEquipmentID),
		})
	}
	return transformed
}

// transformEquipmentHours transforms EquipmentHours from HeavyJob's API to timecard.EquipmentHours objects.
func transformEquipmentHours(hjHours []EquipmentHours, tcEquipmentID string) []timecards.EquipmentHours {
	transformed := []timecards.EquipmentHours{}
	for _, hours := range hjHours {
		ID, err := uuid.NewV4()
		if err != nil {
			continue
		}
		transformed = append(transformed, timecards.EquipmentHours{
			ID:                  ID.String(),
			TimecardEquipmentID: tcEquipmentID,
			TimecardCostCodeID:  hours.TimecardCostCodeID,
			Hours:               hours.Hours,
		})
	}
	return transformed
}
