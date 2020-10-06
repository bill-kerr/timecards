package main

import (
	"log"

	"github.com/bk7987/timecards/common"
	"github.com/bk7987/timecards/config"
	"github.com/bk7987/timecards/employees"
	"github.com/bk7987/timecards/equipment"
	"github.com/bk7987/timecards/heavyjob"
	"github.com/bk7987/timecards/jobs"
	"github.com/bk7987/timecards/timecards"
	"github.com/bk7987/timecards/users"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2/middleware/recover"
	"gorm.io/gorm"
)

func migrate(db *gorm.DB) {
	db.AutoMigrate(&jobs.Job{})
	db.AutoMigrate(&employees.Employee{})
	db.AutoMigrate(&equipment.Equipment{})
	db.AutoMigrate(&timecards.Timecard{})
	db.AutoMigrate(&timecards.TimecardCostCode{})
	db.AutoMigrate(&timecards.TimecardEmployee{})
	db.AutoMigrate(&timecards.EmployeeHours{})
	db.AutoMigrate(&timecards.TimecardEquipment{})
	db.AutoMigrate(&timecards.EquipmentHours{})
	db.AutoMigrate(&users.User{})
}

func main() {
	c := config.Init()
	db := common.InitDB(c.PGConnString)
	migrate(db)
	heavyjob.ScheduleRefresh(heavyjob.ScheduleConfig{
		HCSSTokenRefreshInterval: c.HCSSTokenRefreshInt,
		EmployeeRefreshInterval:  c.EmployeeRefreshInt,
		EquipmentRefreshInterval: c.EquipmentRefreshInt,
		JobRefreshInterval:       c.JobRefreshInt,
		TimecardRefreshInterval:  c.TimecardRefreshInt,
	})

	app := fiber.New()
	app.Use(recover.New())
	app.Use(cors.New())

	api := app.Group("/api")
	v1 := api.Group("/v1", config.SetConfig(), heavyjob.SetClient())

	v1.Post("/test", users.Register)

	v1.Get("/jobs", jobs.GetJobs)
	v1.Get("/jobs/:id", jobs.GetJob)

	v1.Get("/employees", employees.GetEmployees)
	v1.Get("/employees/:id", employees.GetEmployee)
	v1.Patch("/employees/:id", employees.Update)

	v1.Get("/equipment", equipment.GetAllEquipment)
	v1.Get("/equipment/:id", equipment.GetEquipment)

	v1.Get("/timecards", timecards.GetTimecards)
	v1.Get("/timecards/:id", timecards.GetTimecard)
	v1.Get("/timecards/:id/timecard-employees", timecards.GetTimecardEmployeesByTimecard)
	v1.Get("/timecards/:id/timecard-equipment", timecards.GetTimecardEquipment)

	v1.Get("/timecard-employees", timecards.GetTimecardEmployees)

	v1.Get("/timecard-cost-codes", timecards.GetTimecardCostCodes)

	app.Use(common.NotFoundHandler)

	if err := app.Listen(":" + c.Port); err != nil {
		log.Fatal(err.Error())
	}
}
