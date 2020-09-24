package test

import (
	"log"
	"os"

	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

var DB *gorm.DB

// TestDBInit initializes the sqlite test database.
func TestDBInit() *gorm.DB {
	testDB, err := gorm.Open(sqlite.Open("test.db"), &gorm.Config{})
	if err != nil {
		log.Println("db error: ", err)
	}
	DB = testDB
	return DB
}

// TestDBFree deletes the database after running test cases.
func TestDBFree() error {
	return os.Remove("./test.db")
}
