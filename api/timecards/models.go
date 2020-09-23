package timecards

import "github.com/bk7987/timecards/common"

// Timecard represents a single timecard in the database.
type Timecard struct {
	ID                    string             `gorm:"primary_key" json:"id"`
	JobID                 string             `json:"jobId"`
	ForemanID             string             `json:"foremanId"`
	Date                  string             `json:"date"`
	Revision              int                `json:"revision"`
	IsApproved            bool               `json:"isApproved"`
	IsReviewed            bool               `json:"isReviewed"`
	IsAccepted            bool               `json:"isAccepted"`
	IsRejected            bool               `json:"isRejected"`
	SentToPayrollRevision int                `json:"sentToPayrollRevision"`
	SentToPayrollDateTime string             `json:"sentToPayrollDateTime"`
	LastModifiedDateTime  string             `json:"lastModifiedDateTime"`
	TimecardCostCodes     []TimecardCostCode `json:"-"`
	TimecardEmployees     []TimecardEmployee `json:"-"`
	CreatedAt             int64              `json:"createdAt"`
	UpdatedAt             int64              `json:"updatedAt"`
}

// TimecardCostCode represents a single usage of a cost code, which will be associated with EmployeeHours via ID.
type TimecardCostCode struct {
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
	ID              string          `gorm:"primary_key" json:"id"`
	TimecardID      string          `json:"timecardId"`
	EmployeeID      string          `json:"employeeId"`
	RegularHours    []EmployeeHours `json:"regularHours"`
	OvertimeHours   []EmployeeHours `json:"overtimeHours"`
	DoubletimeHours []EmployeeHours `json:"doubletimeHours"`
	CreatedAt       int64           `json:"createdAt"`
	UpdatedAt       int64           `json:"updatedAt"`
}

// EmployeeHours represents all of the hours for a single employee on a specific timecard.
type EmployeeHours struct {
	ID                 string  `gorm:"primary_key" json:"id"`
	TimecardEmployeeID string  `json:"timecardEmployeeID"`
	Hours              float32 `json:"hours"`
	TagCode            string  `json:"tagCode"`
	TimecardCostCodeID string  `json:"timecardCostCodeId"`
	CreatedAt          int64   `json:"createdAt"`
	UpdatedAt          int64   `json:"updatedAt"`
}

// FindOneTimecard finds the first record in the database matching the given condition.
func FindOneTimecard(condition Timecard) (Timecard, error) {
	db := common.GetDB()
	var tc Timecard
	err := db.Where(condition).First(&tc).Error
	return tc, err
}

// UpdateOrSaveTimecard either updates an existing Timecard or saves a new one.
func UpdateOrSaveTimecard(tc Timecard) error {
	db := common.GetDB()
	tx := db.Model(&Timecard{}).Where(Timecard{ID: tc.ID}).Updates(&tc)
	if tx.RowsAffected == 0 {
		return db.Create(&tc).Error
	}
	return tx.Error
}

// UpdateOrSaveManyTimecards performs the UpdateOrSaveTimecard operation on a slice of Timecards.
func UpdateOrSaveManyTimecards(timecards []Timecard) {
	for _, tc := range timecards {
		UpdateOrSaveTimecard(tc)
	}
}

// UpdateOrSaveTimecardCostCode either updates an existing TimecardCostCode or saves a new one.
func UpdateOrSaveTimecardCostCode(cc TimecardCostCode) error {
	db := common.GetDB()
	tx := db.Model(&TimecardCostCode{}).Where(TimecardCostCode{ID: cc.ID}).Updates(&cc)
	if tx.RowsAffected == 0 {
		return db.Create(&cc).Error
	}
	return tx.Error
}

// UpdateOrSaveManyTimecardCostCodes performs the UpdateOrSaveTimecardCostCode operation on a slice of TimecardCostCodes.
func UpdateOrSaveManyTimecardCostCodes(timecardCostCodes []TimecardCostCode) {
	for _, cc := range timecardCostCodes {
		UpdateOrSaveTimecardCostCode(cc)
	}
}

// UpdateOrSaveTimecardEmployee either updates an existing TimecardEmployee or saves a new one.
func UpdateOrSaveTimecardEmployee(em TimecardEmployee) error {
	db := common.GetDB()
	tx := db.Model(&TimecardEmployee{}).Where(TimecardEmployee{ID: em.ID}).Updates(&em)
	if tx.RowsAffected == 0 {
		return db.Create(&em).Error
	}
	return tx.Error
}

// UpdateOrSaveManyTimecardEmployees performs the UpdateOrSaveTimecardEmployee operation on a slice of TimecardEmployees.
func UpdateOrSaveManyTimecardEmployees(timecardEmployees []TimecardEmployee) {
	for _, em := range timecardEmployees {
		UpdateOrSaveTimecardEmployee(em)
	}
}

// UpdateOrSaveEmployeeHours either updates an existing EmployeeHours or saves a new one.
func UpdateOrSaveEmployeeHours(hours EmployeeHours) error {
	db := common.GetDB()
	tx := db.Model(&EmployeeHours{}).Where(EmployeeHours{ID: hours.ID}).Updates(&hours)
	if tx.RowsAffected == 0 {
		return db.Create(&hours).Error
	}
	return tx.Error
}

// UpdateOrSaveManyEmployeeHours performs the UpdateOrSaveEmployeeHours operation on a slice of EmployeeHours.
func UpdateOrSaveManyEmployeeHours(hours []EmployeeHours) {
	for _, hourSet := range hours {
		UpdateOrSaveEmployeeHours(hourSet)
	}
}
