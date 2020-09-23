package jobs

import "github.com/bk7987/timecards/common"

// Job is the database representation of a job.
type Job struct {
	ID          string `gorm:"primary_key" json:"id"`
	JobNumber   string `json:"jobNumber"`
	Description string `json:"description"`
	CreatedAt   int64  `json:"createdAt"`
	UpdatedAt   int64  `json:"updatedAt"`
}

// FindOne returns the first job that matches the given criteria.
func FindOne(condition Job) (Job, error) {
	db := common.GetDB()
	var job Job
	err := db.Where(condition).First(&job).Error
	return job, err
}

// Save saves the provided Job to the database.
func Save(job Job) error {
	db := common.GetDB()
	tx := db.Create(&job)
	return tx.Error
}

// SaveMany saves multiple Jobs to the database.
func SaveMany(job []Job) error {
	db := common.GetDB()
	tx := db.Create(&job)
	return tx.Error
}

// UpdateOrSave updates the matching job, or creates it if it does not exist.
func UpdateOrSave(job Job) error {
	db := common.GetDB()
	tx := db.Model(&Job{}).Where(Job{ID: job.ID}).Updates(&job)
	if tx.RowsAffected == 0 {
		return db.Create(&job).Error
	}
	return tx.Error
}

// UpdateOrSaveMany updates or saves many jobs.
func UpdateOrSaveMany(jobs []Job) error {
	var err error
	for _, job := range jobs {
		err = UpdateOrSave(job)
	}
	return err
}
