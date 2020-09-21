package timecards

import (
	"net/http"

	"github.com/bk7987/timecards/heavyjob"
	"github.com/bk7987/timecards/utils"
	"github.com/gofiber/fiber/v2"
)

// SummaryFilters represents the fields available for filtering the timecard summary request results.
type SummaryFilters struct {
	JobID         string `url:"jobId,omitempty"`
	ForemanID     string `url:"foremanId,omitempty"`
	EmployeeID    string `url:"employeeId,omitempty"`
	StartDate     string `url:"startDate,omitempty"`
	EndDate       string `url:"endDate,omitempty"`
	ModifiedSince string `url:"modifiedSince,omitempty"`
}

// GetTimecardSummaries returns timecard summaries for a given date range.
func GetTimecardSummaries(ctx *fiber.Ctx) error {
	queryvals := SummaryFilters{}
	if err := ctx.QueryParser(&queryvals); err != nil {
		return fiber.NewError(fiber.StatusBadRequest, "Invalid query parameters")
	}

	querystring, err := utils.BuildQuery(queryvals)
	if err != nil {
		return fiber.NewError(http.StatusBadRequest, "Invalid query parameters")
	}

	client := heavyjob.GetClient(ctx)
	summaries, err := client.GetTimecardSummaries(querystring)
	if err != nil {
		return fiber.NewError(http.StatusInternalServerError)
	}

	ctx.JSON(summaries)
	return nil
}

// GetTimecard returns a single timecard.
func GetTimecard(ctx *fiber.Ctx) error {
	ID := utils.ImmutableString(ctx.Params("id"))

	client := heavyjob.GetClient(ctx)
	timecard, err := client.GetTimecard(ID)
	if err != nil {
		return fiber.NewError(http.StatusInternalServerError)
	}

	ctx.JSON(timecard)
	return nil
}

// GetTimecards returns timecards within a specific date range.
func GetTimecards(ctx *fiber.Ctx) error {
	queryvals := SummaryFilters{}
	if err := ctx.QueryParser(&queryvals); err != nil {
		return fiber.NewError(fiber.StatusBadRequest, "Invalid query parameters")
	}

	querystring, err := utils.BuildQuery(queryvals)
	if err != nil {
		return fiber.NewError(http.StatusBadRequest, "Invalid query parameters")
	}

	client := heavyjob.GetClient(ctx)
	summaries, err := client.GetTimecardSummaries(querystring)
	if err != nil {
		return fiber.NewError(http.StatusInternalServerError)
	}

	timecards := []heavyjob.Timecard{}
	for _, summary := range summaries {
		timecard, err := client.GetTimecard(summary.ID)
		if err != nil {
			return fiber.NewError(http.StatusInternalServerError)
		}
		timecards = append(timecards, timecard)
	}

	ctx.JSON(timecards)
	return nil
}
