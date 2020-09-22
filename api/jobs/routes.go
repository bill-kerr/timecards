package jobs

import (
	"github.com/gofiber/fiber/v2"
)

// GetJobs responds with jobs owned by the company.
func GetJobs(ctx *fiber.Ctx) error {
	// fetchAll := true
	// include := strings.Split(ctx.Query("select"), ",")
	// for _, val := range include {
	// 	if val == "all" {
	// 		fetchAll = true
	// 		break
	// 	}

	// 	if val == "" {
	// 		continue
	// 	}

	// 	fetchAll = false
	// }

	// client := heavyjob.GetClient(ctx)
	// jobs, err := client.GetJobs()
	// if err != nil {
	// 	return fiber.NewError(http.StatusInternalServerError, "Internal server error")
	// }

	// if fetchAll {
	// 	ctx.JSON(jobs)
	// 	return nil
	// }

	// filteredJobs := []heavyjob.Job{}
	// for _, job := range jobs {
	// 	if common.Contains(include, job.ID) {
	// 		filteredJobs = append(filteredJobs, job)
	// 	}
	// }

	// ctx.JSON(filteredJobs)
	return nil
}
