package main

import (
	"log"

	"github.com/bk7987/timecards/config"
	"github.com/bk7987/timecards/errors"
	"github.com/bk7987/timecards/heavyjob"
	"github.com/bk7987/timecards/jobs"
	"github.com/bk7987/timecards/timecards"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/recover"
)

func main() {
	c := config.Init()

	app := fiber.New(fiber.Config{
		ErrorHandler: errors.ErrorHandler,
	})
	app.Use(recover.New())
	api := app.Group("/api")

	v1 := api.Group("/v1", config.SetConfig(), heavyjob.SetClient())
	v1.Get("/jobs", jobs.GetJobs)
	v1.Get("/summaries", timecards.GetTimecardSummaries)

	app.Use(errors.NotFoundHandler)

	if err := app.Listen(":" + c.Port); err != nil {
		log.Fatal(err.Error())
	}
}
