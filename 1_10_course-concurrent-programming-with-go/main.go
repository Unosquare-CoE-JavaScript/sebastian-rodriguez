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
	cacheCh := make(chan Book)
	dbCh := make(chan Book)
	for i := 0; i < len; i++ {
		id := rnd.Intn(len) + 1
		wg.Add(1)
		go routineQueryCache(id, wg, m, dbCh)
		wg.Add(1)
		go routineQueryDatabase(id, wg, m, cacheCh)
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

	// Create one goroutine per query to handle response
	go func(cacheCh, dbCh <-chan Book) {
		select {
		case b := <-cacheCh:
			fmt.Println("Found in cache:\n", b)
			<-dbCh
		case b := <-dbCh:
			fmt.Println("Found in database:\n", b)
		}
	}(cacheCh, dbCh)
	wg.Wait()
}

func routineQueryCache(id int, wg *sync.WaitGroup, m *sync.RWMutex, ch chan<- Book) {
	if b, ok := queryCached(id, m); ok {
		ch <- b
	}
	wg.Done()
}

func routineQueryDatabase(id int, wg *sync.WaitGroup, m *sync.RWMutex, ch chan<- Book) {
	if b, ok := queryDatabase(id, m); ok {
		m.Lock()
		cache[id] = b
		m.Unlock()
		ch <- b
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
			return b, true
		}
	}
	return Book{}, false
}
