package contexttopic

import (
	"context"
	"fmt"
	"net/http"
)

type Store interface {
	Fetch(ctx context.Context) (string, error)
	// Cancel()
}

func Server(store Store) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		data, _ := store.Fetch(r.Context())
		fmt.Fprint(w, data)
		// ctx := r.Context()

		// data := make(chan string, 1)

		// go func() {
		// 	time.Sleep(50 * time.Millisecond)
		// 	data <- store.Fetch()
		// }()

		// select {
		// case d := <-data:
		// 	fmt.Fprintln(w, d)
		// // returns a channel which gets sent a signal when the context is "done" or "cancelled"
		// case <-ctx.Done():
		// 	store.Cancel()
		// }
	}
}
