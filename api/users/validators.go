package users

import (
	"github.com/bk7987/timecards/config"
	v "github.com/go-ozzo/ozzo-validation/v4"
)

// ValidateRegister validates the creation of a new user.
func (u *User) ValidateRegister() error {
	c := config.GetConfig()

	return v.ValidateStruct(
		v.Field(&u.Username, v.Required, v.Length(c.MinUsernameLength, c.MaxUsernameLength)),
		v.Field(&u.Password, v.Required, v.Length(c.MinPasswordLength, c.MaxPasswordLength)),
	)
}
