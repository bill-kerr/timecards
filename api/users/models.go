package users

import (
	"fmt"

	"github.com/bk7987/timecards/common"
	"github.com/bk7987/timecards/config"
	"golang.org/x/crypto/bcrypt"
)

// User represents a single user in the database.
type User struct {
	ID       string `gorm:"primary_key" json:"id"`
	Username string `json:"username" gorm:"unique"`
	Password string `json:"-"`
}

func (u *User) setPassword(password string) error {
	minLength := config.MinPasswordLength()
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
func Save(user User) error {
	db := common.GetDB()
	tx := db.Create(&user)
	return tx.Error
}
