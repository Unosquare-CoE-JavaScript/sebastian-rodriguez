package utils

import "fmt"

func printNum(num int) {
	fmt.Println("Current number:", num)
}

// Add adds two or more numbers
func Add(nums ...int) (sum int) {
	for _, num := range nums {
		printNum(num)
		sum += num
	}
	return
}
