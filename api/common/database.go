package common

import (
	"log"
	"os"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"
)

// Database represents the database instance.
type Database struct {
	*gorm.DB
}

// DB is the variables that holds the database instance.
var DB *gorm.DB

// InitDB returns an initialized database.
func InitDB(connString string) *gorm.DB {
	db, err := gorm.Open(postgres.Open(connString), &gorm.Config{
		Logger: getLogger(),
	})
	if err != nil {
		log.Fatal("Failed to connect to the database")
	}
	DB = db
	return DB
}

// GetDB returns the database instance.
func GetDB() *gorm.DB {
	return DB
}

func getLogger() logger.Interface {
	return logger.New(
		log.New(os.Stdout, "\r\n", log.LstdFlags),
		logger.Config{
			LogLevel: logger.Info,
			Colorful: true,
		},
	)
}
