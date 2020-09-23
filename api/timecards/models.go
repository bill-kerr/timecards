package timecards

import (
	"gorm.io/gorm"
)

// Timecard represents a single timecard in the database.
type Timecard struct {
	gorm.Model
	ID                    string             `gorm:"primary_key" json:"id"`
	JobID                 string             `json:"jobId"`
	ForemanID             string             `json:"foremanId"`
	Date                  string             `json:"date"`
	Revision              int                `json:"revision"`
	IsApproved            bool               `json:"isApproved"`
	ApprovedByID          string             `json:"approvedById"`
	IsReviewed            bool               `json:"isReviewed"`
	ReviewedByID          string             `json:"reviewedById"`
	IsAccepted            bool               `json:"isAccepted"`
	AcceptedByID          string             `json:"acceptedById"`
	IsRejected            bool               `json:"isRejected"`
	RejectedByID          string             `json:"rejectedById"`
	SentToPayrollRevision int                `json:"sentToPayrollRevision"`
	SentToPayrollDateTime string             `json:"sentToPayrollDateTime"`
	LastModifiedDateTime  string             `json:"lastModifiedDateTime"`
	TimecardCostCodes     []TimecardCostCode `json:"timecardCostCodes"`
	TimecardEmployees     []TimecardEmployee `json:"timecardEmployees"`
	CreatedAt             int64              `json:"createdAt"`
	UpdatedAt             int64              `json:"updatedAt"`
}

// TimecardCostCode represents a single usage of a cost code, which will be associated with EmployeeHours via ID.
type TimecardCostCode struct {
	gorm.Model
	ID          string  `gorm:"primary_key" json:"id"`
	TimecardID  string  `json:"timecardId"`
	Code        string  `json:"code"`
	Description string  `json:"description"`
	Quantity    float32 `json:"quantity"`
	Unit        string  `json:"unit"`
	CreatedAt   int64   `json:"createdAt"`
	UpdatedAt   int64   `json:"updatedAt"`
}

// TimecardEmployee represents an employee on a single timecard.
type TimecardEmployee struct {
	gorm.Model
	ID                string `gorm:"primary_key" json:"id"`
	TimecardID        string `json:"timecardId"`
	EmployeeID        string `json:"employeeId"`
	RegularHoursID    string `json:"regularHoursId"`
	OvertimeHoursID   string `json:"overtimeHoursId"`
	DoubletimeHoursID string `json:"doubletimeHoursId"`
	CreatedAt         int64  `json:"createdAt"`
	UpdatedAt         int64  `json:"updatedAt"`
}

// EmployeeHours represents all of the hours for a single employee on a specific timecard.
type EmployeeHours struct {
	gorm.Model
	ID                 string  `gorm:"primary_key" json:"id"`
	Hours              float32 `json:"hours"`
	TagCode            string  `json:"tagCode"`
	TimecardCostCodeID string  `json:"timecardCostCodeId"`
	CreatedAt          int64   `json:"createdAt"`
	UpdatedAt          int64   `json:"updatedAt"`
}
