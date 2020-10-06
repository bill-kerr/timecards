package users

import (
	"errors"
	"fmt"

	"github.com/bk7987/timecards/common"
	"github.com/bk7987/timecards/config"
	"golang.org/x/crypto/bcrypt"
)

// User represents a single user in the database.
type User struct {
	ID        string `gorm:"primary_key" json:"id"`
	Username  string `json:"username" gorm:"unique"`
	Password  string `json:"-"`
	CreatedAt int64  `json:"createdAt"`
	UpdatedAt int64  `json:"updatedAt"`
}

func (u *User) setPassword(password string) error {
	minLength := config.GetConfig().MinPasswordLength
	if len(password) < minLength {
		return fmt.Errorf("Password must be longer than %v characters", minLength)
	}

	bytePassword := []byte(password)
	passwordHash, err := bcrypt.GenerateFromPassword(bytePassword, bcrypt.DefaultCost)
	if err != nil {
		return err
	}

	u.Password = string(passwordHash)
	return nil
}

func (u *User) checkPassword(password string) error {
	bytePassword := []byte(password)
	byteHashedPassword := []byte(u.Password)
	return bcrypt.CompareHashAndPassword(byteHashedPassword, bytePassword)
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

// NewUser creates a new User object from a UserRegister object
func NewUser(userRegister *UserRegister) (User, error) {
	user := User{
		ID:       common.UUID(),
		Username: userRegister.Username,
	}

	if err := user.setPassword(userRegister.Password); err != nil {
		return user, errors.New("Error setting password")
	}

	return user, nil
}
