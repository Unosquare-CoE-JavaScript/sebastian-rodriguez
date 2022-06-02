package main

import (
	"fmt"
	"reflect"
)

func variablesMain() {
	var x = 4
	// -> Explicit declaration of type
	// var name string = "Sebastian"
	// var lastName string
	// lastName = "Rodriguez"

	// -> Multiple variables declaration
	// var name, lastName string = "Sebastian", "Rodriguez"

	// -> Short hand syntax declaration
	name, lastName := "Sebastian", "Rodriguez"

	fmt.Println(reflect.TypeOf(name))
	fmt.Printf("My name is %s %s\n", name, lastName)
	fmt.Println(reflect.TypeOf(x))
	fmt.Println(reflect.TypeOf(true))
	// fmt.Println(reflect.TypeOf(x * 5.5))	// error: invalid operation: x * 5.5 (mismatched types int and float64)
	fmt.Println(reflect.TypeOf(float64(x) * 5.5))
}
