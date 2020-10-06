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
	MinPasswordLength   int
	MaxPasswordLength   int
	MinUsernameLength   int
	MaxUsernameLength   int
	JWTSecret           string
	PGConnString        string
	JobRefreshInt       uint64
	EmployeeRefreshInt  uint64
	EquipmentRefreshInt uint64
	TimecardRefreshInt  uint64
}

var envConfig *Config

// Init initializes the environmental variables defined in the Config struct.
func Init() *Config {
	err := godotenv.Load(".env")
	if err != nil {
		log.Fatal("Please create a .env file with the required environmental variables in the root directory of the project.")
	}

	return setConfig()
}

func setConfig() *Config {
	envConfig = &Config{
		Environment:         getEnvironment(),
		Port:                getPort(),
		HCSSClientID:        getHCSSClientID(),
		HCSSClientSecret:    getHCSSClientSecret(),
		HCSSScope:           getHCSSScope(),
		HCSSGrantType:       getHCSSGrantType(),
		HCSSIdentityURL:     getHCSSIdentityURL(),
		HCSSTokenRefreshInt: getHCSSTokenRefreshInt(),
		HeavyjobRootURL:     getHeavyjobRootURL(),
		BusinessUnitID:      getBusinessUnitID(),
		MinPasswordLength:   getMinPasswordLength(),
		MaxPasswordLength:   getMaxPasswordLength(),
		MinUsernameLength:   getMinUsernameLength(),
		MaxUsernameLength:   getMaxUsernameLength(),
		JWTSecret:           getJWTSecret(),
		PGConnString:        getPGConnString(),
		JobRefreshInt:       getJobRefreshInt(),
		EmployeeRefreshInt:  getEmployeeRefreshInt(),
		EquipmentRefreshInt: getEquipmentRefreshInt(),
		TimecardRefreshInt:  getTimecardRefreshInt(),
	}
	return envConfig
}

// GetConfig returns the entire configuraiton object.
func GetConfig() *Config {
	return envConfig
}

// SetConfig returns a middleware that stores the configuration in the fiber context.
func SetConfig() func(*fiber.Ctx) error {
	return func(ctx *fiber.Ctx) error {
		ctx.Locals("config", envConfig)
		ctx.Next()
		return nil
	}
}

func get(key string) string {
	value := os.Getenv(key)
	if value == "" {
		log.Fatalf("Please set the %s environmental variable.", key)
	}
	return value
}

func strToUint64(str string) uint64 {
	num, err := strconv.Atoi(str)
	if err != nil {
		log.Fatal(err.Error())
	}
	return uint64(num)
}

// Environment returns the ENVIRONMENT env variable.
func getEnvironment() string {
	return get("ENV")
}

// Port returns the PORT env variable.
func getPort() string {
	return get("PORT")
}

// HCSSClientID returns the HCSS_CLIENT_ID env variable.
func getHCSSClientID() string {
	return get("HCSS_CLIENT_ID")
}

// HCSSClientSecret returns the HCSS_CLIENT_SECRET env variable.
func getHCSSClientSecret() string {
	return get("HCSS_CLIENT_SECRET")
}

// HCSSScope returns the HCSS_SCOPE env variable.
func getHCSSScope() string {
	return get("HCSS_SCOPE")
}

// HCSSGrantType returns the HCSS_GRANT_TYPE env variable.
func getHCSSGrantType() string {
	return get("HCSS_GRANT_TYPE")
}

// HCSSIdentityURL returns the HCSS_IDENTITY_URL env variable.
func getHCSSIdentityURL() string {
	return get("HCSS_IDENTITY_URL")
}

// HCSSTokenRefreshInt returns the HCSS_TOKEN_REFRESH_INT env variable, which controls how often the API asks for a new token from the HCSS API.
func getHCSSTokenRefreshInt() uint64 {
	return strToUint64(get("HCSS_TOKEN_REFRESH_INT"))
}

// HeavyjobRootURL returns the HEAVYJOB_ROOT_URL env variable.
func getHeavyjobRootURL() string {
	return get("HEAVYJOB_ROOT_URL")
}

// BusinessUnitID returns the manager's business unit id from the BUSINESS_UNIT_ID env variable.
func getBusinessUnitID() string {
	return get("BUSINESS_UNIT_ID")
}

// MinPasswordLength returns the minimum password length as an integer from the MIN_PASSWORD_LENGTH env variable.
func getMinPasswordLength() int {
	length, err := strconv.Atoi(get("MIN_PASSWORD_LENGTH"))
	if err != nil {
		log.Fatal(err.Error())
	}
	return length
}

// MaxPasswordLength returns the maximum password length as an integer from the MAX_PASSWORD_LENGTH env variable.
func getMaxPasswordLength() int {
	length, err := strconv.Atoi(get("MAX_PASSWORD_LENGTH"))
	if err != nil {
		log.Fatal(err.Error())
	}
	return length
}

// MinUsernameLength returns the minimum Username length as an integer from the MIN_USERNAME_LENGTH env variable.
func getMinUsernameLength() int {
	length, err := strconv.Atoi(get("MIN_USERNAME_LENGTH"))
	if err != nil {
		log.Fatal(err.Error())
	}
	return length
}

// MaxUsernameLength returns the maximum Username length as an integer from the MAX_USERNAME_LENGTH env variable.
func getMaxUsernameLength() int {
	length, err := strconv.Atoi(get("MAX_USERNAME_LENGTH"))
	if err != nil {
		log.Fatal(err.Error())
	}
	return length
}

// getJWTSecret returns the JWT secret from the JWT_SECRET env variable.
func getJWTSecret() string {
	return get("JWT_SECRET")
}

// PGConnString returns the connection string for the Postgres database from the PG_CONN_STRING env variable.
func getPGConnString() string {
	return get("PG_CONN_STRING")
}

// JobRefreshInt returns the time in minutes between data refresh calls to the HeavyJob API from the JOB_REFRESH_INT env variable.
func getJobRefreshInt() uint64 {
	return strToUint64(get("JOB_REFRESH_INT"))
}

// EmployeeRefreshInt returns the time in minutes between data refresh calls to the HeavyJob API from the EMPLOYEE_REFRESH_INT env variable.
func getEmployeeRefreshInt() uint64 {
	return strToUint64(get("EMPLOYEE_REFRESH_INT"))
}

// EquipmentRefreshInt returns the time in minutes between data refresh calls to the HeavyJob API from the EQUIPMENT_REFRESH_INT env variable.
func getEquipmentRefreshInt() uint64 {
	return strToUint64(get("EQUIPMENT_REFRESH_INT"))
}

// TimecardRefreshInt returns the time in minutes between data refresh calls to the HeavyJob API from the TIMECARD_REFRESH_INT env varaible.
func getTimecardRefreshInt() uint64 {
	return strToUint64(get("TIMECARD_REFRESH_INT"))
}
