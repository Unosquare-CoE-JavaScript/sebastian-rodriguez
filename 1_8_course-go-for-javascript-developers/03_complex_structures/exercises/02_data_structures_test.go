package main

import (
	"reflect"
	"testing"
)

func Test_exec1(t *testing.T) {
	type args struct {
		scores []float64
	}
	tests := []struct {
		name string
		args args
		want float64
	}{
		{
			name: "Test 1",
			args: args{
				scores: []float64{1, 2, 3, 4, 5},
			},
			want: 3,
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if got := betterAverange(tt.args.scores...); got != tt.want {
				t.Errorf("betterAverange() = %v, want %v", got, tt.want)
			}
		})
	}
}

func Test_exec2(t *testing.T) {
	type args struct {
		pets map[string]string
		pet  string
	}
	tests := []struct {
		name string
		args args
		want bool
	}{
		// TODO: Add test cases.
		{
			name: "Test 1",
			args: args{
				pets: map[string]string{
					"Aron":   "Cat",
					"Bruno":  "Dog",
					"Kira":   "Dog",
					"Luna":   "Cat",
					"Palomo": "Bird",
				},
				pet: "Aron",
			},
			want: true,
		},
		{
			name: "Test 2",
			args: args{
				pets: map[string]string{
					"Aron":   "Cat",
					"Bruno":  "Dog",
					"Kira":   "Dog",
					"Luna":   "Cat",
					"Palomo": "Bird",
				},
				pet: "Clayton",
			},
			want: false,
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if got := findPet(tt.args.pets, tt.args.pet); got != tt.want {
				t.Errorf("findPet() = %v, want %v", got, tt.want)
			}
		})
	}
}

func Test_addGroceryToList(t *testing.T) {
	type args struct {
		groceryList []string
		groceries   []string
	}
	type args2 struct {
		groceryList []string
		groceries   string
	}
	tests := []struct {
		name string
		args args
		want []string
	}{
		// TODO: Add test cases.
		{
			name: "Add multiple groceries",
			args: args{
				groceryList: []string{
					"Lemon",
					"Tomato",
					"Cucumber",
					"Milk",
				},
				groceries: []string{
					"Carrot",
					"Cheese",
				},
			},
			want: []string{
				"Lemon",
				"Tomato",
				"Cucumber",
				"Milk",
				"Carrot",
				"Cheese",
			},
		},
	}
	tests2 := []struct {
		name string
		args args2
		want []string
	}{
		// TODO: Add test cases.
		{
			name: "Add one grocery",
			args: args2{
				groceryList: []string{
					"Lemon",
					"Tomato",
					"Cucumber",
					"Milk",
				},
				groceries: "Carrot",
			},
			want: []string{
				"Lemon",
				"Tomato",
				"Cucumber",
				"Milk",
				"Carrot",
			},
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if got := addGroceryToList(tt.args.groceryList, tt.args.groceries...); !reflect.DeepEqual(got, tt.want) {
				t.Errorf("addGroceryToList() = %v, want %v", got, tt.want)
			}
		})
	}
	for _, tt := range tests2 {
		t.Run(tt.name, func(t *testing.T) {
			if got := addGroceryToList(tt.args.groceryList, tt.args.groceries); !reflect.DeepEqual(got, tt.want) {
				t.Errorf("addGroceryToList() = %v, want %v", got, tt.want)
			}
		})
	}
}

func Test_addGroceryToListSingle(t *testing.T) {
	type args2 struct {
		groceryList []string
		groceries   string
	}
	tests2 := []struct {
		name string
		args args2
		want []string
	}{
		// TODO: Add test cases.
		{
			name: "Add one grocery",
			args: args2{
				groceryList: []string{
					"Lemon",
					"Tomato",
					"Cucumber",
					"Milk",
				},
				groceries: "Carrot",
			},
			want: []string{
				"Lemon",
				"Tomato",
				"Cucumber",
				"Milk",
				"Carrot",
			},
		},
	}
	for _, tt := range tests2 {
		t.Run(tt.name, func(t *testing.T) {
			if got := addGroceryToList(tt.args.groceryList, tt.args.groceries); !reflect.DeepEqual(got, tt.want) {
				t.Errorf("addGroceryToList() = %v, want %v", got, tt.want)
			}
		})
	}
}
