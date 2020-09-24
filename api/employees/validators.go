package employees

import (
	"github.com/bk7987/timecards/common"
	v "github.com/go-ozzo/ozzo-validation/v4"
)

// EmployeeFilters represents the valid query parameters for the employees endpoint.
type EmployeeFilters struct {
	IsForeman    string `url:"isForeman,omitempty"`
	PayClassCode string `url:"payClassCode,omitempty"`
}

// UpdateDTO defines the fields available for an update request.
type UpdateDTO struct {
	IsForeman *bool `json:"isForeman,omitempty"`
}

// Validate validates the query parameters for the employees endpoint.
func (f *EmployeeFilters) Validate() error {
	return v.ValidateStruct(f,
		v.Field(&f.IsForeman, v.Skip.When(f.IsForeman == ""), v.By(common.IsBool)),
	)
}

// Validate validates the request body for an employee update request.
func (d *UpdateDTO) Validate() error {
	return v.ValidateStruct(d, v.Field(&d.IsForeman, v.Skip.When(d.IsForeman == nil)))
}

// Bind binds update values to the employee
func (d *UpdateDTO) Bind(employee *Employee) {
	employee.IsForeman = *d.IsForeman
}
