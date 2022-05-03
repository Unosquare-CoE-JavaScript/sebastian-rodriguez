package main

import "fmt"

type Coordinates struct {
	x, y float64
}

var c = Coordinates{x: 10, y: 20}

func main() {
	coordinatesMemoryAddress := &c
	coordinatesMemoryAddress.x = 30
	coordinatesMemoryAddress.y = 40
	fmt.Println(coordinatesMemoryAddress)
}

// func changeName(n *string) {
// 	*n = strings.ToUpper(*n)
// }

// func main() {
// 	// name := "john"
// 	// changeName(&name)
// 	// fmt.Println(name)

// 	// var name string
// 	// var namePointer *string

// 	// fmt.Println("name:", name)               // ''
// 	// fmt.Println("namePointer:", namePointer) // nil
// 	// fmt.Println("&name:", &name)             // 0xc0000a0a0

// 	// var secondName string = "Beyonce"
// 	// secondNamePointer := &secondName      // Reference 		// &secondName is a pointer to the variable secondName
// 	// secondNameValue := *secondNamePointer // Dereference	//*secondNamePointer is the value of the variable pointed by secondNamePointer

// 	// fmt.Println("secondName:", secondName)
// 	// fmt.Println("secondNamePointer:", secondNamePointer)
// 	// fmt.Println("secondNameValue:", secondNameValue)
// }
