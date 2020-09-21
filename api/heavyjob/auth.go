package heavyjob

import (
	"log"
	"net/url"
	"strings"

	"github.com/bk7987/timecards/config"
	"github.com/imroc/req"
)

// IdentityResponse represents the authentication response from the HCSS API.
type IdentityResponse struct {
	AuthToken string `json:"access_token"`
	ExpiresIn int    `json:"expires_in"`
	TokenType string `json:"token_type"`
}

// GetIdentity returns valid auth token credentials for API authentication.
func GetIdentity() IdentityResponse {
	r := req.New()
	header := req.Header{
		"Accept":       "appilcation/json",
		"Content-Type": "x-www-form-urlencoded",
	}

	data := url.Values{}
	data.Set("client_id", config.HCSSClientID())
	data.Set("client_secret", config.HCSSClientSecret())
	data.Set("scope", config.HCSSScope())
	data.Set("grant_type", config.HCSSGrantType())
	body := strings.NewReader(data.Encode())

	res, err := r.Post(config.HCSSIdentityURL(), body, header)
	if err != nil {
		log.Fatal(err.Error())
	}

	var response IdentityResponse
	if err = res.ToJSON(&response); err != nil {
		log.Fatal(err.Error())
	}
	return response
}
