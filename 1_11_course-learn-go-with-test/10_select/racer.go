package selectTopic

import (
	"net/http"
	"time"
)

func Racer(url1, url2 string, timeout time.Duration) (winner string, err error) {
	select {
	case <-ping(url1):
		return url1, nil
	case <-ping(url2):
		return url2, nil
	case <-time.After(timeout):
		return "", ErrTimeout
	}
}

func ping(url string) chan struct{} {
	ch := make(chan struct{})
	go func() {
		http.Get(url)
		close(ch)
	}()
	return ch
}

func measureTime(url string) time.Duration {
	start := time.Now()
	http.Get(url)
	return time.Since(start)
}
