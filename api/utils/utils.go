package utils

import "github.com/google/go-querystring/query"

// BuildQuery takes a base path and an interface and builds a querystring. Specify mapping with `url:"field_name"`.
func BuildQuery(params interface{}) (string, error) {
	values, err := query.Values(params)
	if err != nil {
		return "", err
	}

	return "?" + values.Encode(), nil
}
