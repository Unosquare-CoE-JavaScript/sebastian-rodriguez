package utils

import "testing"

func TestMakeExcited(t *testing.T) {
	type args struct {
		s string
	}
	tests := []struct {
		name string
		args args
		want string
	}{
		// TODO: Add test cases.
		{
			name: "Make Exciting Function",
			args: args{
				s: "omg so exciting",
			},
			want: "OMG SO EXCITING!",
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if got := MakeExcited(tt.args.s); got != tt.want {
				t.Errorf("MakeExcited() = %v, want %v", got, tt.want)
			}
		})
	}
}
