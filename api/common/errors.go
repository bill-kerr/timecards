package common

import (
	"github.com/gofiber/fiber/v2"
)

// ErrorResponse represents the base error response structure.
type ErrorResponse struct {
	Error      string `json:"error"`
	StatusCode int    `json:"statusCode"`
	Detail     string `json:"detail"`
}

// NotFoundHandler handles all of the requests that do not match a known endpoint.
func NotFoundHandler(ctx *fiber.Ctx) error {
	return NotFoundError(ctx, "The requested endpoint does not exist")
}

// NotFoundError handles not found errors.
func NotFoundError(ctx *fiber.Ctx, details ...string) error {
	response := ErrorResponse{
		Error:      "Not found error",
		StatusCode: fiber.StatusNotFound,
		Detail:     "The requested resource was not found",
	}

	detail, err := GetFirstArg(details)
	if err == nil {
		response.Detail = detail
	}

	return ctx.Status(response.StatusCode).JSON(response)
}

// InternalServerError returns a 500 internal server error with the provided context
func InternalServerError(ctx *fiber.Ctx, details ...string) error {
	response := ErrorResponse{
		Error:      "Internal server error",
		StatusCode: fiber.StatusInternalServerError,
		Detail:     "An unknown error occurred",
	}

	detail, err := GetFirstArg(details)
	if err == nil {
		response.Detail = detail
	}

	return ctx.Status(response.StatusCode).JSON(response)
}

// BadRequestError returns a 400 bad request error with the provided context.
func BadRequestError(ctx *fiber.Ctx, details ...string) error {
	response := ErrorResponse{
		Error:      "Bad request error",
		StatusCode: fiber.StatusBadRequest,
		Detail:     "Bad request submitted",
	}

	detail, err := GetFirstArg(details)
	if err == nil {
		response.Detail = detail
	}

	return ctx.Status(response.StatusCode).JSON(response)
}
