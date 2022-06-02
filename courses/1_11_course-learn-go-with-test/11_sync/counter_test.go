package syncTopic

import (
	"sync"
	"testing"
)

func assertCounter(t *testing.T, got *Counter, want int) {
	t.Helper()
	if got := got.Value(); got != want {
		t.Errorf("Counter.Value() = %v, want %v", got, want)
	}
}

func TestCounter(t *testing.T) {
	type args struct {
		counter *Counter
		times   int
	}
	tests := []struct {
		name string
		args args
		want int
	}{
		{
			name: "Increment",
			args: args{
				counter: NewCounter(),
				times:   1,
			},
			want: 1,
		},
		{
			name: "Increment Concurrent",
			args: args{
				counter: NewCounter(),
				times:   100,
			},
			want: 100,
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {

			var wg sync.WaitGroup
			wg.Add(tt.args.times)

			for i := 0; i < tt.args.times; i++ {
				go func(wait *sync.WaitGroup) {
					tt.args.counter.Increment()
					wait.Done()
				}(&wg)
			}
			wg.Wait()
			assertCounter(t, tt.args.counter, tt.want)
		})
	}
}
