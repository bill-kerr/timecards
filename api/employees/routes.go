package employees

import (
	"errors"

	"github.com/bk7987/timecards/common"
	"github.com/gofiber/fiber/v2"
	"gorm.io/gorm"
)

// GetEmployees returns all employees in the company.
func GetEmployees(ctx *fiber.Ctx) error {
	db := common.GetDB()
	employees := []EmployeeModel{}
	db.Find(&employees)
	return ctx.JSON(employees)
}

// GetEmployee returns the employee with the matching ID.
func GetEmployee(ctx *fiber.Ctx) error {
	ID := common.ImmutableString(ctx.Params("id"))
	employee, err := FindOne(EmployeeModel{ID: ID})
	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return common.NotFoundError(ctx)
		}
	}
	return ctx.JSON(employee)
}

// Update finds and edits an existing employee.
func Update(ctx *fiber.Ctx) error {
	ID := common.ImmutableString(ctx.Params("id"))
	employee := EmployeeModel{}
	if err := ctx.BodyParser(employee); err != nil {
		return common.BadRequestError(ctx, err.Error())
	}

	db := common.GetDB()
	tx := db.Where(EmployeeModel{ID: ID}).Updates(&employee)
	if tx.Error != nil {
		return tx.Error
	}
	return ctx.JSON(employee)
}
