package timecards

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
// func GetTimecardSummaries(ctx *fiber.Ctx) error {
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

// 	return ctx.JSON(summaries)
// }

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
