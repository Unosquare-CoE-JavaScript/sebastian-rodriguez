package main

import "fmt"

func mainSlices() {
	var myArray [5]int
	// var mySlice []int
	// var mySlice []int = make([]int, 5)
	// var mySlice []int = make([]int, 5, 10)
	// empty slice
	var mySlice []int = []int{}

	myArray[0] = 1
	// mySlice[0] = 2		// error will panic with no initializtion
	// mySlice[0] = 2
	mySlice = append(mySlice, 2, 3, 4, 5) 

	fmt.Println(myArray)
	fmt.Println(mySlice)
	fmt.Println(len(mySlice))
	fmt.Println(cap(mySlice))

	fruitArray := [4]string{"Apple", "Orange", "Banana", "Grape"}
	partialSpliceFruits := fruitArray[1:3]
	spliceFruits := fruitArray[:]
	fmt.Println(partialSpliceFruits)
	fmt.Println(spliceFruits)
	fmt.Println(len(spliceFruits))
	fmt.Println(cap(spliceFruits))
}
