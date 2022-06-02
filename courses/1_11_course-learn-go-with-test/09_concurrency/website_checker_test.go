package concurrency

import (
	"reflect"
	"testing"
	"time"
)

func mockWebsiteChecker(url string) bool {
	return url != "waat://furhurterwe.geds"
}

func slowStubWebsiteChecker(_ string) bool {
	time.Sleep(20 * time.Millisecond)
	return true
}

func BenchmarkCheckWebsites(b *testing.B) {
	urls := make([]string, 100)
	for i := 0; i < len(urls); i++ {
		urls[i] = "http://google.com"
	}
	b.ResetTimer()
	for i := 0; i < b.N; i++ {
		CheckWebsite(slowStubWebsiteChecker, urls)
	}
}

func TestCheckWebsite(t *testing.T) {
	type args struct {
		wc   WebsiteChecker
		urls []string
	}
	tests := []struct {
		name string
		args args
		want map[string]bool
	}{
		// TODO: Add test cases.
		{
			name: "CheckWebsite",
			args: args{
				wc: mockWebsiteChecker,
				urls: []string{
					"http://google.com",
					"http://blog.gypsydave5.com",
					"waat://furhurterwe.geds",
				},
			},
			want: map[string]bool{
				"http://google.com":          true,
				"http://blog.gypsydave5.com": true,
				"waat://furhurterwe.geds":    false,
			},
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if got := CheckWebsite(tt.args.wc, tt.args.urls); !reflect.DeepEqual(got, tt.want) {
				t.Errorf("CheckWebsite() = %v, want %v", got, tt.want)
			}
		})
	}
}
