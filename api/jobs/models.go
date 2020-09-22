package jobs

import (
	"github.com/bk7987/timecards/common"
)

// JobModel is the database representation of a job.
type JobModel struct {
	ID          string `gorm:"primary_key" json:"id"`
	JobNumber   string `json:"jobNumber"`
	Description string `json:"description"`
	CreatedAt   int64  `json:"createdAt"`
	UpdatedAt   int64  `json:"updatedAt"`
}

// FindOne returns the first job that matches the given criteria.
func FindOne(condition JobModel) (JobModel, error) {
	db := common.GetDB()
	var job JobModel
	err := db.Where(condition).First(&job).Error
	return job, err
}

// Save saves the provided JobModel to the database.
func Save(job JobModel) error {
	db := common.GetDB()
	tx := db.Create(&job)
	return tx.Error
}

// SaveMany saves multiple JobModels to the database.
func SaveMany(job []JobModel) error {
	db := common.GetDB()
	tx := db.Create(&job)
	return tx.Error
}

// UpdateOrSave updates the matching job, or creates it if it does not exist.
func UpdateOrSave(job JobModel) error {
	db := common.GetDB()
	tx := db.Model(&JobModel{}).Where(JobModel{ID: job.ID}).Updates(&job)
	if tx.RowsAffected == 0 {
		return db.Create(&job).Error
	}
	return tx.Error
}

// UpdateOrSaveMany updates or saves many jobs.
func UpdateOrSaveMany(jobs []JobModel) error {
	var err error
	for _, job := range jobs {
		err = UpdateOrSave(job)
	}
	return err
}
