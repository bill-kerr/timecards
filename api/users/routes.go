package users

import (
	"time"

	"github.com/bk7987/timecards/common"
	"github.com/bk7987/timecards/config"
	"github.com/dgrijalva/jwt-go"
	"github.com/gofiber/fiber/v2"
)

// Register is the endpoint for registering new users.
func Register(ctx *fiber.Ctx) error {
	userInfo := &UserInfo{}
	ctx.BodyParser(&userInfo)
	if err := userInfo.Validate(); err != nil {
		return common.BadRequestError(ctx)
	}

	user, err := NewUser(userInfo)
	if err != nil {
		return common.BadRequestError(ctx)
	}

	if err := user.Save(); err != nil {
		return common.BadRequestError(ctx)
	}

	return ctx.Status(fiber.StatusCreated).JSON(user)
}

// Login is the endpoint for logging in an existing user.
func Login(ctx *fiber.Ctx) error {
	userInfo := &UserInfo{}
	ctx.BodyParser(userInfo)

	user, err := FindOne(User{Username: userInfo.Username})
	if err != nil {
		return common.UnauthorizedError(ctx, "Email or password incorrect")
	}

	if err := user.CheckPassword(userInfo.Password); err != nil {
		return common.UnauthorizedError(ctx, "Email or password incorrect")
	}

	token := jwt.New(jwt.SigningMethodHS256)
	claims := token.Claims.(jwt.MapClaims)
	claims["id"] = user.ID
	claims["expires"] = time.Now().Add(config.GetConfig().JWTExpiration)

	signedToken, err := token.SignedString([]byte(config.GetConfig().JWTSecret))
	if err != nil {
		return common.InternalServerError(ctx)
	}

	return ctx.JSON(fiber.Map{"token": signedToken})
}
