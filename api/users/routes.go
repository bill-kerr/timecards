package users

import (
	"github.com/bk7987/timecards/common"
	"github.com/gofiber/fiber/v2"
)

// Register is the endpoint for registering new users.
func Register(ctx *fiber.Ctx) error {
	var newUser UserRegister

	ctx.BodyParser(&newUser)
	if err := newUser.ValidateRegister(); err != nil {
		return common.BadRequestError(ctx)
	}

	user, err := NewUser(&newUser)
	if err != nil {
		return common.BadRequestError(ctx)
	}

	if err := user.Save(); err != nil {
		return common.BadRequestError(ctx)
	}

	return ctx.Status(fiber.StatusCreated).JSON(user)
}
