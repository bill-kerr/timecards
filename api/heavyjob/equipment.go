package heavyjob

import (
	"fmt"

	"github.com/bk7987/timecards/config"
	"github.com/bk7987/timecards/equipment"
)

// Equipment represents the equipment response from the HeavyJob API.
type Equipment struct {
	EquipmentID                 string `json:"equipmentId"`
	LegacyID                    string `json:"legacyId"`
	EquipmentCode               string `json:"equipmentCode"`
	EquipmentDescription        string `json:"equipmentDescription"`
	GPSDeviceTag                string `json:"gpsDeviceTag"`
	IsRental                    bool   `json:"isRental"`
	Make                        string `json:"make"`
	Model                       string `json:"model"`
	LicensePlate                string `json:"licensePlate"`
	SerialNumber                string `json:"serialNumber"`
	State                       string `json:"state"`
	Year                        int    `json:"year"`
	IsActive                    bool   `json:"isActive"`
	OperatorPayClassID          string `json:"operatorPayClassId"`
	OperatorPayClassCode        string `json:"operatorPayClassCode"`
	OperatorPayClassDescription string `json:"operatorPayClassDescription"`
	EquipmentTypeID             string `json:"equipmentTypeId"`
	EquipmentTypeCode           string `json:"equipmentTypeCode"`
	EquipmentTypeDescription    string `json:"equipmentTypeDescription"`
}

// GetEquipment fetches and returns all equipment from the HeavyJob API
func (c *Client) GetEquipment() ([]Equipment, error) {
	equipment := []Equipment{}
	path := fmt.Sprintf("/businessUnits/%v/equipment", config.GetConfig().BusinessUnitID)
	_, err := c.get(path, &equipment)
	return equipment, err
}

// transformEquipment transforms a HeavyJob API Equipment object to an equipment.Equipment object.
func transformEquipment(equipments []Equipment) []equipment.Equipment {
	transformed := []equipment.Equipment{}
	for _, eq := range equipments {
		transformed = append(transformed, equipment.Equipment{
			ID:               eq.EquipmentID,
			Code:             eq.EquipmentCode,
			Description:      eq.EquipmentDescription,
			IsRental:         eq.IsRental,
			Make:             eq.Make,
			Model:            eq.Model,
			SerialNumber:     eq.SerialNumber,
			Year:             eq.Year,
			OperatorPayClass: eq.OperatorPayClassCode,
			EquipmentType:    eq.EquipmentTypeCode,
		})
	}
	return transformed
}
