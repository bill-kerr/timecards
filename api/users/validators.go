package users

import (
	"github.com/bk7987/timecards/config"
	v "github.com/go-ozzo/ozzo-validation/v4"
)

// UserRegister represents the data fields required for registering a user.
type UserRegister struct {
	Username string `json:"username"`
	Password string `json:"password"`
}

// ValidateRegister validates the creation of a new user.
func (u *UserRegister) ValidateRegister() error {
	c := config.GetConfig()

	return v.ValidateStruct(u,
		v.Field(&u.Username, v.Required, v.Length(c.MinUsernameLength, c.MaxUsernameLength)),
		v.Field(&u.Password, v.Required, v.Length(c.MinPasswordLength, c.MaxPasswordLength)),
	)
}
