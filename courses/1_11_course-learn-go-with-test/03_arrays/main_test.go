package arrays

import (
	"reflect"
	"testing"
)

// func TestSum(t *testing.T) {
// 	type args struct {
// 		numbers []int
// 	}
// 	tests := []struct {
// 		name string
// 		args args
// 		want int
// 	}{
// 		// TODO: Add test cases.
// 		{
// 			name: "Test Sum with numbers = []int{1, 2, 3}",
// 			args: args{
// 				numbers: []int{1, 2, 3},
// 			},
// 			want: 6,
// 		},
// 	}
// 	for _, tt := range tests {
// 		t.Run(tt.name, func(t *testing.T) {
// 			if got := Sum(tt.args.numbers); got != tt.want {
// 				t.Errorf("Sum() = %v, want %v", got, tt.want)
// 			}
// 		})
// 	}
// }

func TestSumAll(t *testing.T) {
	type args struct {
		pairs [][]int
	}
	tests := []struct {
		name string
		args args
		want []int
	}{
		// TODO: Add test cases.
		{
			name: "Test SumAll with pairs = [][]int{{1, 2}, {3, 4}}",
			args: args{
				pairs: [][]int{{1, 2}, {3, 4}},
			},
			want: []int{3, 7},
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if got := SumAll(tt.args.pairs...); !reflect.DeepEqual(got, tt.want) {
				t.Errorf("SumAll() = %v, want %v", got, tt.want)
			}
		})
	}
}

func TestSumAllTails(t *testing.T) {
	type args struct {
		pairs [][]int
	}
	tests := []struct {
		name string
		args args
		want []int
	}{
		// TODO: Add test cases.
		{
			name: "Test SumAllTails with pairs = [][]int{{1, 2, 3}, {3, 4}, {5}}",
			args: args{
				pairs: [][]int{{1, 2, 3}, {3, 4}, {5}},
			},
			want: []int{5, 4, 0},
		},
		{
			name: "Test SumAllTails with pairs = [][]int{}",
			args: args{
				pairs: [][]int{{}, {}, {1,2,3}},
			},
			want: []int{0, 0, 5},
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if got := SumAllTails(tt.args.pairs...); !reflect.DeepEqual(got, tt.want) {
				t.Errorf("SumAllTails() = %v, want %v", got, tt.want)
			}
		})
	}
}
