package employees

import (
	"errors"

	"github.com/bk7987/timecards/common"
	"github.com/gofiber/fiber/v2"
	"gorm.io/gorm"
)

// GetEmployees returns all employees in the company.
func GetEmployees(ctx *fiber.Ctx) error {
	queryvals := EmployeeFilters{}
	if err := ctx.QueryParser(&queryvals); err != nil {
		return common.BadRequestError(ctx, "Invalid query parameters")
	}

	if err := queryvals.Validate(); err != nil {
		return common.BadRequestError(ctx, "Bad query params")
	}

	employees := []Employee{}
	db := common.GetDB()
	if (EmployeeFilters{}) == queryvals {
		db.Find(&employees)
	} else {
		db.Find(&employees, queryvals)
	}

	return ctx.JSON(employees)
}

// GetEmployee returns the employee with the matching ID.
func GetEmployee(ctx *fiber.Ctx) error {
	ID := common.ImmutableString(ctx.Params("id"))
	employee, err := FindOne(Employee{ID: ID})
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
	employee, err := FindOne(Employee{ID: ID})
	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return common.NotFoundError(ctx)
		}
	}

	updates := UpdateDTO{}
	if err := ctx.BodyParser(&updates); err != nil {
		return common.BadRequestError(ctx, err.Error())
	}
	if err := updates.Validate(); err != nil {
		return common.BadRequestError(ctx, err.Error())
	}

	db := common.GetDB()
	if employee.IsForeman != *updates.IsForeman {
		tx := db.Model(&employee).Update("is_foreman", *updates.IsForeman)
		if tx.Error != nil {
			return tx.Error
		}
	}
	return ctx.JSON(employee)
}
