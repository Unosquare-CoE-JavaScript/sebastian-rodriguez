package mocks

import (
	"bytes"
	"reflect"
	"testing"
	"time"
)

const (
	sleep = "sleep"
	write = "write"
)

type SpySleeper struct {
	Calls int
}

func (s *SpySleeper) Sleep() {
	s.Calls++
}

type CountdownOperationsSpy struct {
	Calls []string
}

func (s *CountdownOperationsSpy) Sleep() {
	s.Calls = append(s.Calls, sleep)
}

func (s *CountdownOperationsSpy) Write(p []byte) (n int, err error) {
	s.Calls = append(s.Calls, write)
	return
}

type SpyTime struct {
	durationSlept time.Duration
}

func (s *SpyTime) Sleep(duration time.Duration) {
	s.durationSlept = duration
}

func TestCountdown_Operations(t *testing.T) {
	type args struct {
		count    int
		duration time.Duration
	}
	tests := []struct {
		name       string
		args       args
		want       []string
		wantWriter string
	}{
		// TODO: Add test cases.
		{
			name: "countdown 3",
			args: args{
				count:    3,
				duration: 1 * time.Second,
			},
			want:       []string{sleep, write, sleep, write, sleep, write, sleep, write},
			wantWriter: "3\n2\n1\nGo!",
		},
		{
			name: "countdown 0",
			args: args{
				count:    0,
				duration: 1 * time.Second,
			},
			want:       []string{sleep, write},
			wantWriter: "Go!",
		},
		{
			name: "countdown 5",
			args: args{
				count:    5,
				duration: 1 * time.Second,
			},
			want:       []string{sleep, write, sleep, write, sleep, write, sleep, write, sleep, write, sleep, write},
			wantWriter: "5\n4\n3\n2\n1\nGo!",
		},
		{
			name: "countdown -1",
			args: args{
				count:    -1,
				duration: 1 * time.Second,
			},
			want:       []string{sleep, write},
			wantWriter: "Go!",
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {

			spySleepPrinter := &CountdownOperationsSpy{}

			Countdown(spySleepPrinter, tt.args.count, spySleepPrinter)

			if !reflect.DeepEqual(tt.want, spySleepPrinter.Calls) {
				t.Errorf("wanted calls %v got %v", tt.want, spySleepPrinter.Calls)
			}

		})
		t.Run(tt.name, func(t *testing.T) {
			spySleeper := &SpySleeper{}
			writer := &bytes.Buffer{}

			Countdown(writer, tt.args.count, spySleeper)

			if gotWriter := writer.String(); gotWriter != tt.wantWriter {
				t.Errorf("Countdown() = %v, want %v", gotWriter, tt.wantWriter)
			}
		})
		t.Run(tt.name, func(t *testing.T) {

			writter := &bytes.Buffer{}
			spyTime := &SpyTime{}
			sleeper := &ConfigurableSleeper{
				duration: tt.args.duration,
				sleep:    spyTime.Sleep,
			}

			Countdown(writter, tt.args.count, sleeper)

			if spyTime.durationSlept != tt.args.duration {
				t.Errorf("should have slept for %v but slept for %v", tt.args.duration, spyTime.durationSlept)
			}

		})
	}
}
