package common

import (
	"testing"
	"time"

	"github.com/stretchr/testify/assert"
)

func TestTwoSundaysAgo(t *testing.T) {
	asserts := assert.New(t)
	today := time.Date(2020, time.September, 20, 1, 1, 1, 1, time.Local)
	ago := TwoSundaysAgo(today)
	asserts.Equal(today.Year(), ago.Year())
	asserts.Equal(today.Month(), ago.Month())
	asserts.Equal(6, ago.Day())

	today = time.Date(2020, time.September, 21, 1, 1, 1, 1, time.Local)
	asserts.Equal(today.Year(), ago.Year())
	asserts.Equal(today.Month(), ago.Month())
	asserts.Equal(6, ago.Day())
}

func TestIsDate(t *testing.T) {
	asserts := assert.New(t)

	validDate := "2020-09-23"
	asserts.Nil(IsDate(validDate))

	invalidDate := "2020-13-23"
	asserts.NotNil(IsDate(invalidDate))

	badSeparators := "2020/09/23"
	asserts.NotNil(IsDate(badSeparators))

	badPadding := "2020-9-23"
	asserts.NotNil(IsDate(badPadding))

	notAString := map[string]string{"test": "2020-09-23"}
	asserts.NotNil(IsDate(notAString))
}

func TestIsBool(t *testing.T) {
	asserts := assert.New(t)

	validBools := []string{"true", "false", "TRUE", "FALSE"}
	for _, value := range validBools {
		asserts.Nil(IsBool(value))
	}

	invalidStr := "truthy"
	asserts.NotNil(IsBool(invalidStr))

	notAStr := map[string]string{"true": "true"}
	asserts.NotNil(IsBool(notAStr))
}
