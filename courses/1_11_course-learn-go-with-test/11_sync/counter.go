package syncTopic

import "sync"

type Counter struct {
	mu      sync.Mutex
	counter int
}

func NewCounter() *Counter {
	return &Counter{}
}

func (c *Counter) Increment() {
	c.mu.Lock()
	defer c.mu.Unlock()

	c.counter++
}

func (c *Counter) Value() int {
	return c.counter
}
