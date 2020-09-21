package jobs

import (
	"net/http"

	"github.com/bk7987/timecards/heavyjob"
	"github.com/gofiber/fiber/v2"
)

// GetJobs responds with jobs owned by the company.
func GetJobs(ctx *fiber.Ctx) error {
	client := heavyjob.GetClient(ctx)
	jobs, err := client.GetJobs()
	if err != nil {
		return fiber.NewError(http.StatusInternalServerError, "Internal server error")
	}
	ctx.JSON(jobs)
	return nil
}
