package utils

import "testing"

func TestAdd(t *testing.T) {
	type args struct {
		nums []int
	}
	tests := []struct {
		name    string
		args    args
		wantSum int
	}{
		// TODO: Add test cases.
		{
			name: "Test 1",
			args: args{
				nums: []int{1, 2, 3, 4, 5},
			},
			wantSum: 15,
		},
		{
			name: "Test 2",
			args: args{
				nums: []int{1, 2, 3, 4, 5, 6, 7, 8, 9, 10},
			},
			wantSum: 55,
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if gotSum := Add(tt.args.nums...); gotSum != tt.wantSum {
				t.Errorf("Add() = %v, want %v", gotSum, tt.wantSum)
			}
		})
	}
}
