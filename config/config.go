package config

import (
	"log"
	"os"

	"github.com/gofiber/fiber/v2"
	"github.com/joho/godotenv"
)

// Config represents the configuration state of the application.
type Config struct {
	Environment      string
	Port             string
	HCSSClientID     string
	HCSSClientSecret string
	HCSSScope        string
	HCSSGrantType    string
	HCSSIdentityURL  string
	HeavyjobRootURL  string
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
		Environment:      Environment(),
		Port:             Port(),
		HCSSClientID:     HCSSClientID(),
		HCSSClientSecret: HCSSClientSecret(),
		HCSSScope:        HCSSScope(),
		HCSSGrantType:    HCSSGrantType(),
		HCSSIdentityURL:  HCSSIdentityURL(),
		HeavyjobRootURL:  HeavyjobRootURL(),
	}
}

// SetConfig returns a middleware that stores the configuration in the fiber context.
func SetConfig() func(*fiber.Ctx) {
	c := GetConfig()
	return func(ctx *fiber.Ctx) {
		ctx.Locals("config", c)
		ctx.Next()
	}
}

func get(key string) string {
	return os.Getenv(key)
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

// HeavyjobRootURL returns the HEAVYJOB_ROOT_URL env variable.
func HeavyjobRootURL() string {
	return get("HEAVYJOB_ROOT_URL")
}
