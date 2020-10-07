package users

import (
	"log"

	"github.com/bk7987/timecards/common"
	"github.com/dgrijalva/jwt-go"
	"github.com/gofiber/fiber/v2"
)

// Register is the endpoint for registering new users.
func Register(ctx *fiber.Ctx) error {
	userInfo := &UserInfo{}
	ctx.BodyParser(userInfo)
	if err := userInfo.ValidateRegister(); err != nil {
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
	if err := userInfo.ValidateLogin(); err != nil {
		return common.BadRequestError(ctx)
	}

	user, err := FindOne(User{Username: userInfo.Username})
	if err != nil {
		return common.UnauthorizedError(ctx, "Email or password incorrect")
	}

	if err := user.CheckPassword(userInfo.Password); err != nil {
		return common.UnauthorizedError(ctx, "Email or password incorrect")
	}

	response, err := generateJWTPair(&user)
	if err != nil {
		return common.InternalServerError(ctx)
	}
	return ctx.JSON(response)
}

// RefreshToken is the endpoint for refreshing JWTs.
func RefreshToken(ctx *fiber.Ctx) error {
	tokenReq := tokenRefreshRequest{}
	ctx.BodyParser(&tokenReq)
	log.Println(tokenReq)
	if err := tokenReq.ValidateRefresh(); err != nil {
		return common.BadRequestError(ctx)
	}

	token, err := ParseJWT(tokenReq.RefreshToken)
	if err != nil {
		return common.UnauthorizedError(ctx, "Invalid refresh token")
	}

	if claims, ok := token.Claims.(jwt.MapClaims); ok && token.Valid {
		user, err := FindOne(User{ID: claims["id"].(string)})
		if err != nil {
			return common.UnauthorizedError(ctx, "Invalid refresh token")
		}

		response, err := generateJWTPair(&user)
		if err != nil {
			return common.InternalServerError(ctx)
		}

		return ctx.JSON(response)
	}

	return common.UnauthorizedError(ctx, "Invalid refresh token")
}
