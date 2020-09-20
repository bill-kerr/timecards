package main

import (
	"log"

	"github.com/bk7987/timecards/config"
	"github.com/bk7987/timecards/heavyjob"
	"github.com/gofiber/fiber/v2"
)

func main() {
	c := config.Init()
	app := fiber.New()

	app.Use(config.SetConfig())
	app.Use(heavyjob.SetClient())

	if err := app.Listen(":" + c.Port); err != nil {
		log.Fatal(err.Error())
	}
}
