package contexttopic

import (
	"context"
	"errors"
	"log"
	"net/http"
	"net/http/httptest"
	"testing"
	"time"
)

type SpyStore struct {
	// cancelled bool
	response string
	t        *testing.T
}

type SpyResponseWriter struct {
	written bool
}

func (s *SpyResponseWriter) Header() http.Header {
	s.written = true
	return nil
}

func (s *SpyResponseWriter) Write([]byte) (int, error) {
	s.written = true
	return 0, errors.New("not implemented")
}

func (s *SpyResponseWriter) WriteHeader(statusCode int) {
	s.written = true
}

// type StubStore struct {
// 	response string
// }

func (s *SpyStore) Fetch(ctx context.Context) (string, error) {

	data := make(chan string, 1)

	go func() {
		var result string
		for _, c := range s.response {
			select {
			case <-ctx.Done():
				log.Println("spy store got cancelled")
				return
			default:
				time.Sleep(10 * time.Millisecond)
				result += string(c)
			}
		}
		data <- result
	}()

	select {
	case <-ctx.Done():
		return "", ctx.Err()
	case res := <-data:
		return res, nil
	}

}

// func (s *SpyStore) Cancel() {
// 	s.cancelled = true
// }

// func (s *SpyStore) assertWasCancelled() {
// 	s.t.Helper()
// 	if !s.cancelled {
// 		s.t.Error("store was not cancelled")
// 	}
// }

// func (s *SpyStore) assertWasNotCancelled() {
// 	s.t.Helper()
// 	if s.cancelled {
// 		s.t.Error("store was cancelled")
// 	}
// }

func TestServer(t *testing.T) {
	type args struct {
		data    string
		timeout time.Duration
	}
	tests := []struct {
		name             string
		args             args
		wantCancellation bool
	}{
		// TODO: Add test cases.
		{
			name: "server should return data from store",
			args: args{
				data:    "Hello, World!",
				timeout: 250 * time.Millisecond,
			},
			wantCancellation: false,
		},
		{
			name: "tells store to cancel work if request is cancelled",
			args: args{
				data:    "Hello, World!",
				timeout: 25 * time.Millisecond,
			},
			wantCancellation: true,
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {

			store := &SpyStore{
				response: tt.args.data,
				t:        t,
			}

			server := Server(store)

			request := httptest.NewRequest(http.MethodGet, "/", nil)

			// cancellingCtx, cancel := context.WithCancel(request.Context())
			// time.AfterFunc(tt.args.timeout, cancel)
			// request = request.WithContext(cancellingCtx)

			response := httptest.NewRecorder()

			server.ServeHTTP(response, request)

			if response.Body.String() != tt.args.data {
				t.Errorf("got '%s', want '%s'", response.Body.String(), tt.args.data)
			}

			// if tt.wantCancellation {
			// 	if !response.written {
			// 		t.Error("response should have been written")
			// 	}
			// }

			// if tt.wantCancellation {
			// 	store.assertWasCancelled()
			// } else {
			// 	store.assertWasNotCancelled()
			// }
		})
	}
}

// func TestServer(t *testing.T) {
// 	type args struct {
// 		data string
// 	}
// 	tests := []struct {
// 		name string
// 		args args
// 	}{
// 		// TODO: Add test cases.
// 		{
// 			name: "Returns a response",
// 			args: args{
// 				data: "Hello, World!",
// 			},
// 		},
// 	}
// 	for _, tt := range tests {
// 		t.Run(tt.name, func(t *testing.T) {
// 			store := &SpyStore{
// 				response: tt.args.data,
// 			}
// 			svr := Server(store)

// 			request := httptest.NewRequest("GET", "/", nil)

// 			// Derive a new context from the request.
// 			cancellingCtx, cancel := context.WithCancel(request.Context())
// 			time.AfterFunc(500*time.Millisecond, cancel)

// 			// Replace the request's context with the derived one.
// 			request = request.WithContext(cancellingCtx)

// 			response := httptest.NewRecorder()

// 			svr.ServeHTTP(response, request)

// 			if response.Body.String() != tt.args.data {
// 				t.Errorf("got %v, want %v", response.Body.String(), tt.args.data)
// 			}
// 		})
// 	}
// 	for _, tt := range tests {
// 		t.Run(tt.name, func(t *testing.T) {
// 			store := &SpyStore{
// 				response: tt.args.data,
// 			}
// 			svr := Server(store)

// 			request := httptest.NewRequest("GET", "/", nil)

// 			// Derive a new context from the request.
// 			cancellingCtx, cancel := context.WithCancel(request.Context())
// 			time.AfterFunc(200*time.Millisecond, cancel)

// 			// Replace the request's context with the derived one.
// 			request = request.WithContext(cancellingCtx)

// 			response := httptest.NewRecorder()

// 			svr.ServeHTTP(response, request)

// 			if store.cancelled {
// 				t.Errorf("it should not have cancelled the store")
// 			}
// 		})
// 	}
// }
