package common

import (
	"errors"
	"strconv"
	"time"

	"github.com/gofiber/fiber/v2/utils"
	"github.com/google/go-querystring/query"
)

// BuildQuery takes a base path and an interface and builds a querystring. Specify mapping with `url:"field_name"`.
func BuildQuery(params interface{}) (string, error) {
	values, err := query.Values(params)
	if err != nil {
		return "", err
	}

	return "?" + values.Encode(), nil
}

// ImmutableString returns a copy of the supplied string.
func ImmutableString(str string) string {
	return utils.ImmutableString(str)
}

// Contains checks if a given string is contained within the given slice.
func Contains(slice []string, str string) bool {
	for _, val := range slice {
		if val == str {
			return true
		}
	}
	return false
}

// GetFirstArg returns the first element of a string array. Helpful for parsing optional string arguments.
func GetFirstArg(args []string) (string, error) {
	if len(args) > 0 {
		return args[0], nil
	}
	return "", errors.New("No arguments")
}

// TwoSundaysAgo returns the date that corresponds to two sundays ago, starting from the provided time.
func TwoSundaysAgo(t time.Time) time.Time {
	subDays := 7
	if t.Weekday() == time.Sunday {
		subDays = 14
	}
	sub := int(time.Sunday-t.Weekday()) - subDays
	return t.AddDate(0, 0, sub)
}

// IsDate validates that a string matches YYYY-MM-DD and is a valid date.
func IsDate(value interface{}) error {
	s, _ := value.(string)
	_, err := time.Parse("2006-01-02", s)
	if err != nil {
		return err
	}
	return nil
}

// IsBool validates that a string is a boolean value
func IsBool(value interface{}) error {
	s, _ := value.(string)
	_, err := strconv.ParseBool(s)
	if err != nil {
		return err
	}
	return nil
}
