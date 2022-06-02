package main

import "fmt"

func arraysMain() {
	var scores [5]float64
	fmt.Println(scores)

	scores[0] = 100
	scores[1] = 90
	scores[2] = 80
	scores[3] = 70
	scores[4] = 60
	// scores[5] = 50 // errror: index out of range

	var students [3]string = [3]string{"John", "Paul", "George"}
	fmt.Println(students)

	prices := [5]float64{1.99, 2.99, 3.99, 4.99, 5.99}
	fmt.Println(prices)

	accounts := [...]int{1, 2, 3, 4, 5}
	fmt.Println(accounts)

	for i := 0; i < len(accounts); i++ {
		fmt.Println(accounts[i])
	}
}
