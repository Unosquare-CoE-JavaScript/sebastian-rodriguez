package dependencyinjection

import (
	"bytes"
	"testing"
)

func TestGreet(t *testing.T) {
	type args struct {
		buffer *bytes.Buffer
		name   string
	}
	tests := []struct {
		name string
		args args
		want string
	}{
		// TODO: Add test cases.
		{
			name: "greet buffer",
			args: args{
				buffer: &bytes.Buffer{},
				name:   "Chris",
			},
			want: "Hello, Chris",
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			Greet(tt.args.buffer, tt.args.name)
			got := tt.args.buffer.String()
			if got != tt.want {
				t.Errorf("Greet() = %v, want %v", got, tt.want)
			}
		})
	}
}
