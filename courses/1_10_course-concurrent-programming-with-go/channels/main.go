package main

import (
	"fmt"
	"sync"
)

func main() {
	wg := &sync.WaitGroup{}
	ch := make(chan int, 1)

	wg.Add(2)

	go func(ch <-chan int, wg *sync.WaitGroup) {
		// Check if the channel is closed
		// if msg, ok := <-ch; ok {
		// 	fmt.Println("Received:", msg)
		// }

		for msg := range ch {
			fmt.Println("Received:", msg)
		}
		wg.Done()
	}(ch, wg)

	go func(ch chan<- int, wg *sync.WaitGroup) {
		for i := 0; i < 10; i++ {
			ch <- i
		}
		close(ch)
		wg.Done()
	}(ch, wg)

	wg.Wait()
}
