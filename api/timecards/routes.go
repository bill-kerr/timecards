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

	timecards := getTimecards(queryvals)
	return ctx.JSON(timecards)
}

// GetTimecardEmployees returns timecard employees for timecards within a specified date range.
func GetTimecardEmployees(ctx *fiber.Ctx) error {
	queryvals := TimecardEmployeeFilters{}
	if err := ctx.QueryParser(&queryvals); err != nil {
		return common.BadRequestError(ctx, "Invalid query parameters")
	}
	if err := queryvals.Validate(); err != nil {
		return common.BadRequestError(ctx, "Bad query params")
	}

	timecards := getTimecards(TimecardFilters{
		StartDate: queryvals.StartDate,
		EndDate:   queryvals.EndDate,
	})

	timecardIDs := []string{}
	for _, tc := range timecards {
		timecardIDs = append(timecardIDs, tc.ID)
	}

	db := common.GetDB()
	employees := []TimecardEmployee{}
	if err := db.Preload("Hours").Where("timecard_id IN ?", timecardIDs).Find(&employees).Error; err != nil {
		return err
	}

	return ctx.JSON(employees)
}

// GetTimecardEmployeesByTimecard returns timecard employees for the specified timecard.
func GetTimecardEmployeesByTimecard(ctx *fiber.Ctx) error {
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

// GetEmployeeHours TODO
func GetEmployeeHours(ctx *fiber.Ctx) error {
	return nil
}

// GetTimecardCostCodes returns all timecard cost codes between two dates.
func GetTimecardCostCodes(ctx *fiber.Ctx) error {
	queryvals := TimecardCostCodeFilters{}
	if err := ctx.QueryParser(&queryvals); err != nil {
		return common.BadRequestError(ctx, "Invalid query parameters")
	}
	if err := queryvals.Validate(); err != nil {
		return common.BadRequestError(ctx, "Bad query params")
	}

	timecards := getTimecards(TimecardFilters{
		StartDate: queryvals.StartDate,
		EndDate:   queryvals.EndDate,
	})

	timecardIDs := []string{}
	for _, tc := range timecards {
		timecardIDs = append(timecardIDs, tc.ID)
	}

	db := common.GetDB()
	costCodes := []TimecardCostCode{}
	if err := db.Where("timecard_id IN ?", timecardIDs).Find(&costCodes).Error; err != nil {
		return err
	}

	return ctx.JSON(costCodes)
}

func getTimecards(filters TimecardFilters) []Timecard {
	timecards := []Timecard{}
	db := common.GetDB()

	db.Transaction(func(tx *gorm.DB) error {
		if (TimecardFilters{}) == filters {
			return tx.Order("date DESC").Find(&timecards).Error
		}
		if filters.StartDate != "" {
			tx = tx.Where("date >= ?", filters.StartDate)
		}
		if filters.EndDate != "" {
			tx = tx.Where("date <= ?", filters.EndDate)
		}

		return tx.Order("date DESC").Find(&timecards, filters).Error
	})

	return timecards
}
