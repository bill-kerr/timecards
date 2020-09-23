package timecards

import (
	"log"

	"github.com/bk7987/timecards/common"
	"github.com/gofiber/fiber/v2"
	"gorm.io/gorm"
)

// GetTimecards returns all timecards matching the given query parameters.
func GetTimecards(ctx *fiber.Ctx) error {
	queryvals := TimecardFilters{}
	if err := ctx.QueryParser(&queryvals); err != nil {
		return common.BadRequestError(ctx, "Invalid query parameters")
	}

	if err := queryvals.Validate(); err != nil {
		return common.BadRequestError(ctx, "Bad query params")
	}

	timecards := []Timecard{}
	db := common.GetDB()

	log.Println(queryvals)
	db.Transaction(func(tx *gorm.DB) error {
		if queryvals.StartDate != "" {
			tx = tx.Where("date >= ?", queryvals.StartDate)
		}
		if queryvals.EndDate != "" {
			tx = tx.Where("date <= ?", queryvals.EndDate)
		}
		tx.Order("date DESC").Find(&timecards, queryvals)
		return nil
	})

	return ctx.JSON(timecards)
}

// GetTimecardEmployees returns all timecard employees matching the given query parameters.
func GetTimecardEmployees(ctx *fiber.Ctx) error {
	timecardID := common.ImmutableString(ctx.Params("id"))
	employees := []TimecardEmployee{}
	db := common.GetDB()

	if err := db.Preload("RegularHours").Preload("OvertimeHours").Preload("DoubletimeHours").Find(&employees, &TimecardEmployee{
		TimecardID: timecardID,
	}).Error; err != nil {
		return err
	}

	return ctx.JSON(employees)
}

// GetTimecard returns a single timecard.
// func GetTimecard(ctx *fiber.Ctx) error {
// 	ID := common.ImmutableString(ctx.Params("id"))

// 	client := heavyjob.GetClient(ctx)
// 	timecard, err := client.GetTimecard(ID)
// 	if err != nil {
// 		return common.InternalServerError(ctx)
// 	}

// 	return ctx.JSON(timecard)
// }

// GetTimecards returns timecards within a specific date range.
// func GetTimecards(ctx *fiber.Ctx) error {
// 	queryvals := SummaryFilters{}
// 	if err := ctx.QueryParser(&queryvals); err != nil {
// 		return common.BadRequestError(ctx, "Invalid query parameters")
// 	}

// 	querystring, err := common.BuildQuery(queryvals)
// 	if err != nil {
// 		return common.BadRequestError(ctx, "Invalid query parameters")
// 	}

// 	client := heavyjob.GetClient(ctx)
// 	summaries, err := client.GetTimecardSummaries(querystring)
// 	if err != nil {
// 		return common.InternalServerError(ctx)
// 	}

// 	timecards := []heavyjob.Timecard{}
// 	for _, summary := range summaries {
// 		timecard, err := client.GetTimecard(summary.ID)
// 		if err != nil {
// 			return common.InternalServerError(ctx)
// 		}
// 		timecards = append(timecards, timecard)
// 	}

// 	return ctx.JSON(timecards)
// }
