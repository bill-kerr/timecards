package main

import (
	"log"

	"github.com/bk7987/timecards/config"
	"github.com/gofiber/fiber/v2"
)

func main() {
	c := config.Init()
	app := fiber.New()

	if err := app.Listen(":" + c.Port); err != nil {
		log.Fatal(err.Error())
	}
}
