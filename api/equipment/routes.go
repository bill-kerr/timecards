package equipment

import (
	"errors"

	"github.com/bk7987/timecards/common"
	"github.com/gofiber/fiber/v2"
	"gorm.io/gorm"
)

// GetAllEquipment returns all pieces of equipment in the database.
func GetAllEquipment(ctx *fiber.Ctx) error {
	db := common.GetDB()
	equipment := []Equipment{}
	db.Find(&equipment)
	return ctx.JSON(equipment)
}

// GetEquipment returns the piece of equipment with the matching ID.
func GetEquipment(ctx *fiber.Ctx) error {
	ID := common.ImmutableString(ctx.Params("id"))
	equipment, err := FindOne(Equipment{ID: ID})
	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return common.NotFoundError(ctx)
		}
	}
	return ctx.JSON(equipment)
}
