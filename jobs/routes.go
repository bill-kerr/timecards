package jobs

import (
	"net/http"

	"github.com/bk7987/timecards/heavyjob"
	"github.com/gofiber/fiber/v2"
)

// GetAllJobs responds with all jobs owned by the company.
func GetAllJobs(ctx *fiber.Ctx) error {
	client := heavyjob.GetClient(ctx)
	jobs, err := client.GetAllJobs()
	if err != nil {
		return fiber.NewError(http.StatusInternalServerError, "Internal server error")
	}
	ctx.JSON(jobs)
	return nil
}
