package employees

import (
	"github.com/bk7987/timecards/common"
)

// Employee represents a single employee in the system.
type Employee struct {
	ID                  string `gorm:"primary_key" json:"id"`
	Name                string `json:"name"`
	IsForeman           bool   `gorm:"default:false" json:"isForeman"`
	PayClassCode        string `json:"payClassCode"`
	PayClassDescription string `json:"payClassDescription"`
	PayClassID          string `json:"payClassId"`
	CreatedAt           int64  `json:"createdAt"`
	UpdatedAt           int64  `json:"updatedAt"`
}

// FindOne returns the first job that matches the given criteria.
func FindOne(condition Employee) (Employee, error) {
	db := common.GetDB()
	var employee Employee
	err := db.Where(condition).First(&employee).Error
	return employee, err
}

// UpdateOrSave updates the matching employee, or creates it if it does not exist.
func UpdateOrSave(employee Employee) error {
	db := common.GetDB()
	tx := db.Model(&Employee{}).Where(Employee{ID: employee.ID}).Updates(&employee)
	if tx.RowsAffected == 0 {
		return db.Create(&employee).Error
	}
	return tx.Error
}

// UpdateOrSaveMany updates or saves many employees.
func UpdateOrSaveMany(employees []Employee) error {
	var err error
	for _, employee := range employees {
		err = UpdateOrSave(employee)
	}
	return err
}
