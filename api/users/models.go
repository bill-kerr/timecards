package users

import (
	"errors"

	"github.com/bk7987/timecards/common"
)

// User represents a single user in the database.
type User struct {
	ID        string `gorm:"primary_key" json:"id"`
	Username  string `json:"username" gorm:"unique"`
	Password  string `json:"-"`
	CreatedAt int64  `json:"createdAt"`
	UpdatedAt int64  `json:"updatedAt"`
}

// UserInfo represents the data fields required for registering or logging in a user.
type UserInfo struct {
	Username string `json:"username"`
	Password string `json:"password"`
}

// FindOne returns the first user that matches the given criteria.
func FindOne(condition User) (User, error) {
	db := common.GetDB()
	var user User
	err := db.Where(condition).First(&user).Error
	return user, err
}

// Save saves the provided User to the database.
func (u *User) Save() error {
	db := common.GetDB()
	tx := db.Create(u)
	return tx.Error
}

// NewUser creates a new User from a UserInfo struct
func NewUser(userInfo *UserInfo) (User, error) {
	user := User{
		ID:       common.UUID(),
		Username: userInfo.Username,
	}

	if err := user.setPassword(userInfo.Password); err != nil {
		return user, errors.New("Error setting password")
	}

	return user, nil
}
