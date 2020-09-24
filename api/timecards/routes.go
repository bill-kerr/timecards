package timecards

import (
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

	db.Transaction(func(tx *gorm.DB) error {
		if queryvals.StartDate != "" {
			tx = tx.Where("date >= ?", queryvals.StartDate)
		}
		if queryvals.EndDate != "" {
			tx = tx.Where("date <= ?", queryvals.EndDate)
		}
		if (TimecardFilters{}) == queryvals {
			return tx.Order("date DESC").Find(&timecards).Error
		}

		return tx.Order("date DESC").Find(&timecards, queryvals).Error
	})

	return ctx.JSON(timecards)
}

// GetTimecardEmployees returns timecard employees for the specified timecard.
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

// GetTimecardEquipment returns timecard equipment for the specified timecard.
func GetTimecardEquipment(ctx *fiber.Ctx) error {
	timecardID := common.ImmutableString(ctx.Params("id"))
	equipment := []TimecardEquipment{}
	db := common.GetDB()

	if err := db.Preload("Hours").Find(&equipment, &TimecardEquipment{
		TimecardID: timecardID,
	}).Error; err != nil {
		return err
	}

	return ctx.JSON(equipment)
}

// GetTimecard returns a single timecard matching the ID in the URL parameter.
func GetTimecard(ctx *fiber.Ctx) error {
	ID := common.ImmutableString(ctx.Params("id"))
	timecard, err := FindOneTimecard(Timecard{ID: ID})
	if err != nil {
		return common.NotFoundError(ctx)
	}
	return ctx.JSON(timecard)
}

// GetEmployeeHours dfd
func GetEmployeeHours(ctx *fiber.Ctx) error {
	return nil
}
