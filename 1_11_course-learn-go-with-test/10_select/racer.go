package selectTopic

import (
	"net/http"
	"time"
)

func Racer(url1, url2 string) (winner string) {
	aDuration := measureTime(url1)
	bDuration := measureTime(url2)

	if aDuration < bDuration {
		return url1
	}
	return url2
}

func measureTime(url string) time.Duration {
	start := time.Now()
	http.Get(url)
	return time.Since(start)
}
