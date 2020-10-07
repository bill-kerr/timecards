package users

import (
	"github.com/bk7987/timecards/config"
	v "github.com/go-ozzo/ozzo-validation/v4"
)

// ValidateRegister checks that the username and password exist and are valid.
func (u *UserInfo) ValidateRegister() error {
	c := config.GetConfig()

	return v.ValidateStruct(u,
		v.Field(&u.Username, v.Required, v.NotNil, v.Length(c.MinUsernameLength, c.MaxUsernameLength)),
		v.Field(&u.Password, v.Required, v.NotNil, v.Length(c.MinPasswordLength, c.MaxPasswordLength)),
	)
}

// ValidateLogin validates a login attempt by requiring the username and password fields.
func (u *UserInfo) ValidateLogin() error {
	return v.ValidateStruct(u,
		v.Field(&u.Username, v.Required, v.NotNil),
		v.Field(&u.Password, v.Required, v.NotNil),
	)
}
