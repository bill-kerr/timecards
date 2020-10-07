package users

import (
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
		return common.InternalServerError(ctx)
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

	pair, err := generateJWTPair(&user)
	if err != nil {
		return common.InternalServerError(ctx)
	}

	SetRefreshTokenCookie(ctx, pair.RefreshToken)
	return ctx.JSON(&UserResponse{
		ID:          user.ID,
		Username:    user.Username,
		AccessToken: pair.AccessToken,
	})
}

// RefreshToken is the endpoint for refreshing JWTs.
func RefreshToken(ctx *fiber.Ctx) error {
	tokenReq := ctx.Cookies("refreshToken", "")
	if tokenReq == "" {
		return common.UnauthorizedError(ctx, "Invalid refresh token")
	}

	token, err := ParseJWT(tokenReq)
	if err != nil {
		return common.UnauthorizedError(ctx, "Invalid refresh token")
	}

	if claims, ok := token.Claims.(jwt.MapClaims); ok && token.Valid {
		user, err := FindOne(User{ID: claims["id"].(string)})
		if err != nil {
			return common.UnauthorizedError(ctx, "Invalid refresh token")
		}

		pair, err := generateJWTPair(&user)
		if err != nil {
			return common.InternalServerError(ctx)
		}

		SetRefreshTokenCookie(ctx, pair.RefreshToken)
		return ctx.JSON(&UserResponse{
			ID:          user.ID,
			Username:    user.Username,
			AccessToken: pair.AccessToken,
		})
	}

	return common.UnauthorizedError(ctx, "Invalid refresh token")
}
