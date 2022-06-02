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

func assertError(t *testing.T, wantedError bool, err error) {
	if wantedError && err == nil {
		t.Errorf("Expected an error but got nil")
	}
	if !wantedError && err != nil {
		t.Errorf("Expected no error but got %s", err)
	}
}

func TestRacer(t *testing.T) {
	type args struct {
		fastUrlDelay time.Duration
		slowUrlDelay time.Duration
		timeout      time.Duration
		wantedError  bool
	}
	tests := []struct {
		name string
		args args
	}{
		// TODO: Add test cases.
		{
			name: "first url is faster",
			args: args{
				fastUrlDelay: 0 * time.Millisecond,
				slowUrlDelay: 10 * time.Millisecond,
				timeout:      50 * time.Millisecond,
				wantedError:  false,
			},
		},
		{
			name: "take more than 10 secs",
			args: args{
				fastUrlDelay: 11 * time.Second,
				slowUrlDelay: 12 * time.Second,
				timeout:      10 * time.Second,
				wantedError:  true,
			},
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {

			slowServer := makeDelayedTestingServer(tt.args.slowUrlDelay)

			fastServer := makeDelayedTestingServer(tt.args.fastUrlDelay)

			defer slowServer.Close()
			defer fastServer.Close()

			slowUrl := slowServer.URL
			fastUrl := fastServer.URL

			gotWinner, err := Racer(slowUrl, fastUrl, tt.args.timeout)

			if tt.args.wantedError {
				assertError(t, tt.args.wantedError, err)
			} else {
				if gotWinner != fastUrl || gotWinner == "" {
					t.Errorf("Racer() = %v, want %v", gotWinner, fastUrl)
				}
			}

		})
	}
}
