package iterations

import "testing"

func TestRepeat(t *testing.T) {
	type args struct {
		character string
		count     int
	}
	tests := []struct {
		name string
		args args
		want string
	}{
		// TODO: Add test cases.
		{
			name: "Test Repeat with character = \"a\", count = 3",
			args: args{
				character: "a",
				count:     3,
			},
			want: "aaa",
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if got := Repeat(tt.args.character, tt.args.count); got != tt.want {
				t.Errorf("Repeat() = %v, want %v", got, tt.want)
			}
		})
	}
}
