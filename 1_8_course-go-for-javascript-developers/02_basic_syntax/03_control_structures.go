package main

import "fmt"

func controlStructuresMain() {
	// if
	if x := 5; x > 5 {
		fmt.Println("x is greater than 5")
	} else if x < 5 {
		fmt.Println("x is less than 5")
	} else {
		fmt.Println("x is equal to 5")
	}

	// error handling basic
	err := someFunction()
	if err != nil {
		fmt.Println(err.Error())
	}
	if err := someFunction(); err != nil {
		fmt.Println(err.Error())
	}

	// switch
	switch x := 5; {
	case x > 5:
		fmt.Println("x is greater than 5")
	case x < 5:
		fmt.Println("x is less than 5")
	default:
		fmt.Println("x is equal to 5")
	}

	switch "Hello" {
	case "Golang":
		fmt.Println("World")
	case "Hello", "World":
		fmt.Println("Hello, World!")
	default:
		fmt.Println("Unknown")
	}

	// switch with fallthrough
	item := 6
	switch {
	case item > 5:
		fmt.Println("item is greater than 5")
		fallthrough
	case item < 5:
		fmt.Println("item is less than 5")
	default:
		fmt.Println("item is equal to 5")
	}

	// for
	for i := 0; i < 5; i++ {
		fmt.Println(i)
	}

	// for simplified
	for i := 0; i < 5; {
		fmt.Println(i)
		i++
	}

	// for as while
	newNumber := 0
	for newNumber < 10 {
		newNumber++
		fmt.Println(newNumber)
	}

	// for with range
	for i, v := range []int{1, 2, 3, 4, 5} {
		fmt.Println(i, v)
	}

	// for with range without index
	for _, v := range "Hello, World!" {
		if string(v) == " " {
			continue
		}
		fmt.Print("-", string(v))
	}

	fmt.Print("\n")

	// for with range and continue
	for i, v := range []int{1, 2, 3, 4, 5} {
		if i == 2 {
			continue
		}
		fmt.Println(i, v)
	}

	// for with range and break
	for i, v := range []int{1, 2, 3, 4, 5} {
		if i == 2 {
			break
		}
		fmt.Println(i, v)
	}

	// for with range and break and continue
	for i, v := range []int{1, 2, 3, 4, 5} {
		if i == 2 {
			continue
		}
		if i == 4 {
			break
		}
		fmt.Println(i, v)
	}

	// for with range and break and continue and label
loop:
	for i, v := range []int{1, 2, 3, 4, 5} {
		if i == 2 {
			continue
		}
		if i == 4 {
			break loop
		}
		fmt.Println(i, v)
	}
}

func someFunction() error {
	return nil
}
