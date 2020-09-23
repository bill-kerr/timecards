package heavyjob

import (
	"fmt"

	"github.com/bk7987/timecards/config"
	"github.com/bk7987/timecards/employees"
)

// Employee represents the employee response object from the HeavyJob API.
type Employee struct {
	ID                         string `json:"id"`
	DefaultPayClassCode        string `json:"defaultPayClassCode"`
	DefaultPayClassDescription string `json:"defaultPayClassDescription"`
	Code                       string `json:"code"`
	FirstName                  string `json:"firstName"`
	MiddleInitial              string `json:"middleInitial"`
	LastName                   string `json:"lastName"`
	Suffix                     string `json:"suffix"`
	Nickname                   string `json:"nickName"`
	Email                      string `json:"email"`
	IsSalaried                 bool   `json:"isSalaried"`
	IsActive                   bool   `json:"isActive"`
	DefaultPayClassID          string `json:"defaultPayClassId"`
}

// GetEmployees fetches and returns all employees from the HeavyJob API
func (c *Client) GetEmployees() ([]Employee, error) {
	employees := []Employee{}
	path := fmt.Sprintf("/businessUnits/%v/employees", config.GetConfig().BusinessUnitID)
	_, err := c.get(path, &employees)
	return employees, err
}

// transformEmployees returns a slice of transformed Employee models.
func transformEmployees(hjEmployees []Employee) []employees.Employee {
	transformed := []employees.Employee{}
	for _, employee := range hjEmployees {
		transformed = append(transformed, employees.Employee{
			ID:                  employee.ID,
			Name:                employee.getName(),
			PayClassCode:        employee.DefaultPayClassCode,
			PayClassDescription: employee.DefaultPayClassDescription,
			PayClassID:          employee.DefaultPayClassID,
		})
	}
	return transformed
}

// getName transforms first, middle, last, and suffix names into a single name
func (e *Employee) getName() string {
	name := e.FirstName
	if e.MiddleInitial != "" {
		name += " " + e.MiddleInitial
	}
	if e.LastName != "" {
		name += " " + e.LastName
	}
	if e.Suffix != "" {
		name += " " + e.Suffix
	}
	return name
}
