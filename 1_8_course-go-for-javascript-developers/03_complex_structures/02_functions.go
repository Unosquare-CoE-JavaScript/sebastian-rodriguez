package main

import "fmt"

func functionMain() {
	printAge(30)
	newAge := printAgeWithReturn(30)
	fmt.Println("My new age is:", newAge)
	newAge, unit := printMultipleReturnValues(30)
	fmt.Printf("My new age is: %d %s", newAge, unit)
	printMultipleArgs(1, 2, 3, 4, 5)
}

// simple function
func printAge(age int) {
	fmt.Println(age)
}

// function with return value
func printAgeWithReturn(age int) int {
	fmt.Println(age)
	return age + 1
}

// function with multiple return values
func printMultipleReturnValues(age int) (int, string) {
	return age, "years"
}

// variatic function
func printMultipleArgs(args ...int) {
	for _, arg := range args {
		fmt.Println(arg)
	}
}
