package users

import (
	"github.com/bk7987/timecards/config"
	v "github.com/go-ozzo/ozzo-validation/v4"
)

// Validate checks that the username and password are valid.
func (u *UserInfo) Validate() error {
	c := config.GetConfig()

	return v.ValidateStruct(u,
		v.Field(&u.Username, v.Required, v.Length(c.MinUsernameLength, c.MaxUsernameLength)),
		v.Field(&u.Password, v.Required, v.Length(c.MinPasswordLength, c.MaxPasswordLength)),
	)
}
