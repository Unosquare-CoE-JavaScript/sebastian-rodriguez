package main

import (
	"fmt"
	"math/rand"
	"time"
)

var cache = make(map[int]Book)
var rnd = rand.New(rand.NewSource(time.Now().UnixNano()))

func main() {
	initializeAppState(len(books))
}

func initializeAppState(len int) {
	for i := 0; i < len; i++ {
		id := rnd.Intn(len) + 1
		go routineQueryCache(id)
		go routineQueryDatabase(id)
		// if b, ok := queryCached(id); ok {
		// 	fmt.Println("Found in cache:\n", b)
		// 	continue
		// }
		// if b, ok := queryDatabase(id); ok {
		// 	fmt.Println("Found in database:\n", b)
		// 	continue
		// }
		// fmt.Println("Book not found with id:", id)
		time.Sleep(time.Millisecond * 150)
	}
	time.Sleep(2 * time.Second)
}

func routineQueryCache(id int) {
	if b, ok := queryCached(id); ok {
		fmt.Println("Found in cache:\n", b)
	}
}

func routineQueryDatabase(id int) {
	if b, ok := queryDatabase(id); ok {
		fmt.Println("Found in database:\n", b)
	}
}

func queryCached(id int) (Book, bool) {
	if b, ok := cache[id]; ok {
		return b, true
	}
	return Book{}, false
}

func queryDatabase(id int) (Book, bool) {
	time.Sleep(time.Millisecond * 100)
	for _, b := range books {
		if b.ID == id {
			cache[id] = b
			return b, true
		}
	}
	return Book{}, false
}
