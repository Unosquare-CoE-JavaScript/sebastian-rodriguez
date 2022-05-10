package selectTopic

import (
	"net/http"
	"net/http/httptest"
	"testing"
	"time"
)

func makeDelayedTestingServer(delay time.Duration) *httptest.Server {
	return httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		time.Sleep(delay)
		w.WriteHeader(http.StatusOK)
	}))
}

func TestRacer(t *testing.T) {
	tests := []struct {
		name string
	}{
		// TODO: Add test cases.
		{
			name: "first url is faster",
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {

			slowServer := makeDelayedTestingServer(20 * time.Millisecond)

			fastServer := makeDelayedTestingServer(0 * time.Millisecond)

			defer slowServer.Close()
			defer fastServer.Close()

			slowUrl := slowServer.URL
			fastUrl := fastServer.URL

			gotWinner := Racer(slowUrl, fastUrl)
			if gotWinner != fastUrl {
				t.Errorf("Racer() = %v, want %v", gotWinner, fastUrl)
			}
		})
	}
}
