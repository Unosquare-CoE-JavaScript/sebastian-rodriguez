package main

import "testing"

func Test_averange(t *testing.T) {
	type args struct {
		values []float64
	}
	tests := []struct {
		name string
		args args
		want float64
	}{
		// TODO: Add test cases.
		{
			name: "test1",
			args: args{
				values: []float64{1, 2, 3, 4, 5},
			},
			want: 3,
		},
		{
			name: "test2",
			args: args{
				values: []float64{1, 2, 3, 4, 5, 6, 7, 8, 9, 10},
			},
			want: 5.5,
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if got := averange(tt.args.values...); got != tt.want {
				t.Errorf("averange() = %v, want %v", got, tt.want)
			}
		})
	}
}
