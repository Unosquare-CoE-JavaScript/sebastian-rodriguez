package main

import (
	"fmt"
)

func isGreaterThan(a, b int) (error, bool) {
	if a > b {
		return fmt.Errorf("a: %v is greater than b: %v", a, b), false
	}
	return nil, true
}

// func main() {
// 	if err, result := isGreaterThan(10, 20); err != nil {
// 		fmt.Println(err)
// 	} else {
// 		fmt.Println(result)
// 	}

// 	if err, result := isGreaterThan(20, 10); err != nil {
// 		log.Fatalln(err)
// 		// panic(err)
// 	} else {
// 		fmt.Println(result)
// 	}
// }
