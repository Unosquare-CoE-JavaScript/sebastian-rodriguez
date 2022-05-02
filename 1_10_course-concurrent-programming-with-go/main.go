package main

import (
	"fmt"
	"math/rand"
	"sync"
	"time"
)

var cache = make(map[int]Book, 10)
var rnd = rand.New(rand.NewSource(time.Now().UnixNano()))

func main() {
	initializeAppState(len(books))
}

func initializeAppState(len int) {
	wg := &sync.WaitGroup{}
	m := &sync.RWMutex{}
	for i := 0; i < len; i++ {
		id := rnd.Intn(len) + 1
		wg.Add(1)
		go routineQueryDatabase(id, wg, m)
		wg.Add(1)
		go routineQueryCache(id, wg, m)
		// wg.Add(1)
		// go func(id int, wg *sync.WaitGroup, mt *sync.RWMutex) {
		// 	if b, ok := queryCached(id, mt); ok {
		// 		fmt.Println("Found in cache:\n", b)
		// 	}
		// 	wg.Done()
		// }(id, wg, m)
		// wg.Add(1)
		// go func(id int, wg *sync.WaitGroup, mt *sync.RWMutex) {
		// 	if b, ok := queryDatabase(id, mt); ok {
		// 		fmt.Println("Found in database:\n", b)
		// 	}
		// 	wg.Done()
		// }(id, wg, m)
		// fmt.Println("Book not found with id:", id)
		time.Sleep(time.Millisecond * 150)
	}
	wg.Wait()
}

func routineQueryCache(id int, wg *sync.WaitGroup, m *sync.RWMutex) {
	if b, ok := queryCached(id, m); ok {
		fmt.Println("Found in cache:\n", b)
	}
	wg.Done()
}

func routineQueryDatabase(id int, wg *sync.WaitGroup, m *sync.RWMutex) {
	if b, ok := queryDatabase(id, m); ok {
		fmt.Println("Found in database:\n", b)
	}
	wg.Done()
}

func queryCached(id int, m *sync.RWMutex) (Book, bool) {
	m.RLock()
	b, ok := cache[id]
	m.RUnlock()
	return b, ok
}

func queryDatabase(id int, m *sync.RWMutex) (Book, bool) {
	time.Sleep(time.Millisecond * 100)
	for _, b := range books {
		if b.ID == id {
			m.Lock()
			cache[id] = b
			m.Unlock()
			return b, true
		}
	}
	return Book{}, false
}
