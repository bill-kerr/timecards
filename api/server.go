package main

import (
	"log"

	"github.com/bk7987/timecards/common"
	"github.com/bk7987/timecards/config"
	"github.com/bk7987/timecards/employees"
	"github.com/bk7987/timecards/heavyjob"
	"github.com/bk7987/timecards/jobs"
	"github.com/bk7987/timecards/timecards"
	"github.com/gofiber/fiber/v2"
	"gorm.io/gorm"
)

func migrate(db *gorm.DB) {
	db.AutoMigrate(&jobs.JobModel{})
	db.AutoMigrate(&employees.EmployeeModel{})
}

func main() {
	c := config.Init()
	db := common.InitDB(c.PGConnString)
	migrate(db)
	heavyjob.ScheduleRefresh(heavyjob.ScheduleConfig{
		HCSSTokenUpdateInterval: c.HCSSTokenRefreshInt,
		EmployeeUpdateInterval:  c.EmployeeRefreshInt,
		JobUpdateInterval:       c.JobRefreshInt,
	})

	app := fiber.New()
	api := app.Group("/api")

	v1 := api.Group("/v1", config.SetConfig(), heavyjob.SetClient())
	v1.Get("/jobs", jobs.GetJobs)
	v1.Get("/jobs/:id", jobs.GetJob)
	v1.Get("/summaries", timecards.GetTimecardSummaries)
	v1.Get("/timecards/:id", timecards.GetTimecard)
	v1.Get("/timecards", timecards.GetTimecards)
	v1.Get("/employees", employees.GetEmployees)
	v1.Get("/employees/:id", employees.GetEmployee)
	v1.Patch("/employees/:id", employees.Update)

	app.Use(common.NotFoundHandler)

	if err := app.Listen(":" + c.Port); err != nil {
		log.Fatal(err.Error())
	}
}
