package arrays

import "fmt"

func Sum(numbers []int) int {
	sum := 0
	for _, number := range numbers {
		sum += number
	}
	return sum
}

func SumAll(pairs ...[]int) []int {
	var sums []int
	for _, pair := range pairs {
		sums = append(sums, Sum(pair))
	}
	return sums
}

func SumAllTails(pairs ...[]int) []int {
	fmt.Println("Pairs leng: ", len(pairs))
	var sums []int
	for _, pair := range pairs {
		if len(pair) == 0 {
			sums = append(sums, 0)
		} else {
			tail := pair[1:]
			sums = append(sums, Sum(tail))
		}
	}
	return sums
}