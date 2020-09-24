package equipment

import "github.com/bk7987/timecards/common"

// Equipment represents a single piece of equipment in the database.
type Equipment struct {
	ID                          string `json:"id"`
	Code                        string `json:"code"`
	Description                 string `json:"description"`
	IsRental                    bool   `json:"isRental"`
	Make                        string `json:"make"`
	Model                       string `json:"model"`
	SerialNumber                string `json:"serialNumber"`
	Year                        int    `json:"year"`
	OperatorPayClass            string `json:"operatorPayClass"`
	OperatorPayClassDescription string `json:"operatorPayClassDescription"`
	EquipmentType               string `json:"equipmentType"`
}

// FindOne returns the first piece of equipment that matches the given criteria.
func FindOne(condition Equipment) (Equipment, error) {
	db := common.GetDB()
	var eq Equipment
	err := db.Where(condition).First(&eq).Error
	return eq, err
}

// UpdateOrSave updates the matching equipment, or creates it if it does not exist.
func UpdateOrSave(eq Equipment) error {
	db := common.GetDB()
	tx := db.Model(&Equipment{}).Where(Equipment{ID: eq.ID}).Updates(&eq)
	if tx.RowsAffected == 0 {
		return db.Create(&eq).Error
	}
	return tx.Error
}

// UpdateOrSaveMany updates or saves many pieces of equipment.
func UpdateOrSaveMany(equipment []Equipment) error {
	var err error
	for _, eq := range equipment {
		err = UpdateOrSave(eq)
	}
	return err
}
