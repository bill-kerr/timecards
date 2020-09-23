package jobs

import (
	"errors"
	"strings"

	"github.com/bk7987/timecards/common"
	"github.com/gofiber/fiber/v2"
	"gorm.io/gorm"
)

// GetJobs responds with jobs owned by the company.
func GetJobs(ctx *fiber.Ctx) error {
	fetchAll := true
	include := strings.Split(ctx.Query("select"), ",")
	for _, val := range include {
		if val == "all" {
			fetchAll = true
			break
		}
		if val == "" {
			continue
		}
		fetchAll = false
	}

	db := common.GetDB()
	jobs := []Job{}

	if fetchAll {
		db.Find(&jobs)
		ctx.JSON(jobs)
		return nil
	}

	db.Find(&jobs, include)
	return ctx.JSON(jobs)
}

// GetJob returns a job by ID.
func GetJob(ctx *fiber.Ctx) error {
	ID := common.ImmutableString(ctx.Params("id"))
	job, err := FindOne(Job{ID: ID})
	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return common.NotFoundError(ctx)
		}
	}
	return ctx.JSON(job)
}
