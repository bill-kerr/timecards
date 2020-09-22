package employees

// EmployeeModel represents a single employee in the system.
type EmployeeModel struct {
	ID                  string `gorm:"primary_key" json:"id"`
	Name                string `json:"name"`
	PayClassCode        string `json:"payClassCode"`
	PayClassDescription string `json:"payClassDescription"`
	PayClassID          string `json:"payClassId"`
}
