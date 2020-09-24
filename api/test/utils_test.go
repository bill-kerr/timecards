package test

import (
	"testing"
	"time"

	"github.com/bk7987/timecards/common"
	"github.com/bk7987/timecards/heavyjob"
	"github.com/stretchr/testify/assert"
)

func TestBuildQuery(t *testing.T) {
	asserts := assert.New(t)

	filters := heavyjob.TimecardFilters{
		StartDate: "2020-04-05",
	}
	result, _ := common.BuildQuery(filters)
	asserts.Equal("?startDate=2020-04-05", result)

	filters = heavyjob.TimecardFilters{
		StartDate: "2020-04-05",
		EndDate:   "2020-05-04",
	}
	result, _ = common.BuildQuery(filters)
	asserts.Equal("?endDate=2020-05-04&startDate=2020-04-05", result)

	badFilter := "this is just a string"
	result, err := common.BuildQuery(badFilter)
	asserts.NotNil(err)
}

func TestImmutableString(t *testing.T) {
	t.Parallel()
	asserts := assert.New(t)
	res := common.ImmutableString("Hello, world!")
	asserts.Equal("Hello, world!", res)
}

func TestGetFirstArg(t *testing.T) {
	asserts := assert.New(t)
	str, _ := common.GetFirstArg([]string{"test", "notfirst", "another"})
	asserts.Equal("test", str)

	_, err := common.GetFirstArg([]string{})
	asserts.NotNil(err)
}

func TestTwoSundaysAgo(t *testing.T) {
	asserts := assert.New(t)
	today := time.Date(2020, time.September, 20, 1, 1, 1, 1, time.Local)
	ago := common.TwoSundaysAgo(today)
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
	asserts.Nil(common.IsDate(validDate))

	invalidDate := "2020-13-23"
	asserts.NotNil(common.IsDate(invalidDate))

	badSeparators := "2020/09/23"
	asserts.NotNil(common.IsDate(badSeparators))

	badPadding := "2020-9-23"
	asserts.NotNil(common.IsDate(badPadding))

	notAString := map[string]string{"test": "2020-09-23"}
	asserts.NotNil(common.IsDate(notAString))
}

func TestIsBool(t *testing.T) {
	asserts := assert.New(t)

	validBools := []string{"true", "false", "TRUE", "FALSE"}
	for _, value := range validBools {
		asserts.Nil(common.IsBool(value))
	}

	invalidStr := "truthy"
	asserts.NotNil(common.IsBool(invalidStr))

	notAStr := map[string]string{"true": "true"}
	asserts.NotNil(common.IsBool(notAStr))
}
