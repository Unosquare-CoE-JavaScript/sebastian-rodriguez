package main

import "fmt"

func recoverFromPanic() {
	if r := recover(); r != nil {
		fmt.Println("Recovered from panic:", r)
	}
}

func doThings() {
	defer recoverFromPanic()
	for i := 0; i < 4; i++ {
		fmt.Println(i)
		if i == 2 {
			panic("PANIC!")
		}
	}
}

func main() {
	doThings()
}
