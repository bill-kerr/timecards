package users

import (
	"strings"

	"github.com/bk7987/timecards/common"
	"github.com/bk7987/timecards/config"
	"github.com/dgrijalva/jwt-go"
	"github.com/gofiber/fiber/v2"
)

func extractBearerToken(ctx *fiber.Ctx) (*jwt.Token, error) {
	header := ctx.Get("Authorization")
	if len(header) > 5 && strings.ToUpper(header[0:7]) == "BEARER " {
		return jwt.Parse(header[7:], func(token *jwt.Token) (interface{}, error) {
			return []byte(config.GetConfig().JWTSecret), nil
		})
	}
	return &jwt.Token{}, common.NotFoundError(ctx)
}

func setUser(ctx *fiber.Ctx, userID string) error {
	user, err := FindOne(User{ID: userID})
	if err != nil {
		return common.NotFoundError(ctx)
	}

	ctx.Locals("user", user)
	return nil
}

// RequireAuth checks for a valid JWT and sets the user in the current context.
func RequireAuth(ctx *fiber.Ctx) error {
	token, err := extractBearerToken(ctx)
	if err != nil {
		return common.NotFoundError(ctx)
	}

	if claims, ok := token.Claims.(jwt.MapClaims); ok && token.Valid {
		userID := claims["id"].(string)
		if err := setUser(ctx, userID); err != nil {
			return err
		}
		return ctx.Next()
	}

	return common.NotFoundError(ctx)
}
