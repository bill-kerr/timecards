package errors

import (
	"github.com/gofiber/fiber/v2"
)

// ErrorResponse represents the base error response structure.
type ErrorResponse struct {
	Title  string `json:"title"`
	Code   int    `json:"code"`
	Detail string `json:"detail"`
}

// ErrorHandler is the middleware that catches every error thrown in the program.
func ErrorHandler(ctx *fiber.Ctx, err error) error {
	response := ErrorResponse{
		Title:  err.Error(),
		Code:   fiber.StatusInternalServerError,
		Detail: "An unknown error occurred",
	}

	if e, ok := err.(*fiber.Error); ok {
		response.Code = e.Code
		response.Detail = e.Message
	}

	if err = ctx.Status(response.Code).JSON(response); err != nil {
		ctx.Status(fiber.StatusInternalServerError).SendString("An unknown error occurred")
	}

	return nil
}

// NotFoundHandler handles all of the requests that do not match a known endpoint.
func NotFoundHandler(ctx *fiber.Ctx) error {
	response := ErrorResponse{
		Title:  "Not found",
		Code:   fiber.StatusNotFound,
		Detail: "The requested enpoint was not found",
	}

	return ctx.Status(fiber.StatusNotFound).JSON(response)
}
