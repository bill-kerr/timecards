package timecards

import (
	"github.com/bk7987/timecards/common"
	v "github.com/go-ozzo/ozzo-validation/v4"
)

// TimecardFilters represents the filters that can be applied when fetching timecards.
type TimecardFilters struct {
	JobID      string `url:"jobId,omitempty"`
	ForemanID  string `url:"foremanId,omitempty"`
	EmployeeID string `url:"employeeId,omitempty"`
	StartDate  string `url:"startDate,omitempty" gorm:"-"`
	EndDate    string `url:"endDate,omitempty" gorm:"-"`
	IsApproved string `url:"isApproved,omitempty"`
	IsReviewed string `url:"isReviewed,omitempty"`
	IsAccepted string `url:"isAccepted,omitempty"`
	IsRejected string `url:"isRejected,omitempty"`
}

// Validate validates TimecardFilter fields
func (f *TimecardFilters) Validate() error {
	return v.ValidateStruct(f,
		v.Field(&f.StartDate, v.Skip.When(f.StartDate == ""), v.By(common.IsDate)),
		v.Field(&f.EndDate, v.Skip.When(f.EndDate == ""), v.By(common.IsDate)),
		v.Field(&f.IsApproved, v.Skip.When(f.IsApproved == ""), v.By(common.IsBool)),
		v.Field(&f.IsReviewed, v.Skip.When(f.IsReviewed == ""), v.By(common.IsBool)),
		v.Field(&f.IsAccepted, v.Skip.When(f.IsAccepted == ""), v.By(common.IsBool)),
		v.Field(&f.IsRejected, v.Skip.When(f.IsRejected == ""), v.By(common.IsBool)),
	)
}
