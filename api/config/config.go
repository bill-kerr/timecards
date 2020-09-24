package config

import (
	"log"
	"os"
	"strconv"

	"github.com/gofiber/fiber/v2"
	"github.com/joho/godotenv"
)

// Config represents the configuration state of the application.
type Config struct {
	Environment         string
	Port                string
	HCSSClientID        string
	HCSSClientSecret    string
	HCSSScope           string
	HCSSGrantType       string
	HCSSIdentityURL     string
	HCSSTokenRefreshInt uint64
	HeavyjobRootURL     string
	BusinessUnitID      string
	PGConnString        string
	JobRefreshInt       uint64
	EmployeeRefreshInt  uint64
	EquipmentRefreshInt uint64
	TimecardRefreshInt  uint64
}

// Init initializes the environmental variables defined in the Config struct.
func Init() *Config {
	err := godotenv.Load(".env")
	if err != nil {
		log.Fatal(err.Error())
	}

	return GetConfig()
}

// GetConfig returns the entire configuraiton object.
func GetConfig() *Config {
	return &Config{
		Environment:         Environment(),
		Port:                Port(),
		HCSSClientID:        HCSSClientID(),
		HCSSClientSecret:    HCSSClientSecret(),
		HCSSScope:           HCSSScope(),
		HCSSGrantType:       HCSSGrantType(),
		HCSSIdentityURL:     HCSSIdentityURL(),
		HCSSTokenRefreshInt: HCSSTokenRefreshInt(),
		HeavyjobRootURL:     HeavyjobRootURL(),
		BusinessUnitID:      BusinessUnitID(),
		PGConnString:        PGConnString(),
		JobRefreshInt:       JobRefreshInt(),
		EmployeeRefreshInt:  EmployeeRefreshInt(),
		EquipmentRefreshInt: EquipmentRefreshInt(),
		TimecardRefreshInt:  TimecardRefreshInt(),
	}
}

// SetConfig returns a middleware that stores the configuration in the fiber context.
func SetConfig() func(*fiber.Ctx) error {
	c := GetConfig()
	return func(ctx *fiber.Ctx) error {
		ctx.Locals("config", c)
		ctx.Next()
		return nil
	}
}

func get(key string) string {
	return os.Getenv(key)
}

func strToUint64(str string) uint64 {
	num, err := strconv.Atoi(str)
	if err != nil {
		log.Fatal(err.Error())
	}
	return uint64(num)
}

// Environment returns the ENVIRONMENT env variable.
func Environment() string {
	return get("ENV")
}

// Port returns the PORT env variable.
func Port() string {
	return get("PORT")
}

// HCSSClientID returns the HCSS_CLIENT_ID env variable.
func HCSSClientID() string {
	return get("HCSS_CLIENT_ID")
}

// HCSSClientSecret returns the HCSS_CLIENT_SECRET env variable.
func HCSSClientSecret() string {
	return get("HCSS_CLIENT_SECRET")
}

// HCSSScope returns the HCSS_SCOPE env variable.
func HCSSScope() string {
	return get("HCSS_SCOPE")
}

// HCSSGrantType returns the HCSS_GRANT_TYPE env variable.
func HCSSGrantType() string {
	return get("HCSS_GRANT_TYPE")
}

// HCSSIdentityURL returns the HCSS_IDENTITY_URL env variable.
func HCSSIdentityURL() string {
	return get("HCSS_IDENTITY_URL")
}

// HCSSTokenRefreshInt returns the HCSS_TOKEN_REFRESH_INT env variable, which controls how often the API asks for a new token from the HCSS API.
func HCSSTokenRefreshInt() uint64 {
	return strToUint64(get("HCSS_TOKEN_REFRESH_INT"))
}

// HeavyjobRootURL returns the HEAVYJOB_ROOT_URL env variable.
func HeavyjobRootURL() string {
	return get("HEAVYJOB_ROOT_URL")
}

// BusinessUnitID returns the manager's business unit id from the BUSINESS_UNIT_ID env variable.
func BusinessUnitID() string {
	return get("BUSINESS_UNIT_ID")
}

// PGConnString returns the connection string for the Postgres database from the PG_CONN_STRING env variable.
func PGConnString() string {
	return get("PG_CONN_STRING")
}

// JobRefreshInt returns the time in minutes between data refresh calls to the HeavyJob API from the JOB_REFRESH_INT env variable.
func JobRefreshInt() uint64 {
	return strToUint64(get("JOB_REFRESH_INT"))
}

// EmployeeRefreshInt returns the time in minutes between data refresh calls to the HeavyJob API from the EMPLOYEE_REFRESH_INT env variable.
func EmployeeRefreshInt() uint64 {
	return strToUint64(get("EMPLOYEE_REFRESH_INT"))
}

// EquipmentRefreshInt returns the time in minutes between data refresh calls to the HeavyJob API from the EQUIPMENT_REFRESH_INT env variable.
func EquipmentRefreshInt() uint64 {
	return strToUint64(get("EQUIPMENT_REFRESH_INT"))
}

// TimecardRefreshInt returns the time in minutes between data refresh calls to the HeavyJob API from the TIMECARD_REFRESH_INT env varaible.
func TimecardRefreshInt() uint64 {
	return strToUint64(get("TIMECARD_REFRESH_INT"))
}
