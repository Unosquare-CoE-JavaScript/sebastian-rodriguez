package main

import "fmt"

func printWithLineAtTheEnd(text string) {
	fmt.Println(text)
}

func printWithNoNewLine(text string) {
	fmt.Print(text)
}

func printFormat(text string, values ...any) {
	fmt.Printf(text, values[0], values[1], values[2])
}
