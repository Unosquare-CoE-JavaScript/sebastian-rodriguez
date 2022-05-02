package main

import (
	"context"
	"fmt"
	stlog "log"

	"github.com/Unosquare-CoE-JavaScript/sebastian-rodriguez/1_9_course-building-distributed-applications-with-go/app/log"
	"github.com/Unosquare-CoE-JavaScript/sebastian-rodriguez/1_9_course-building-distributed-applications-with-go/app/registry"
	"github.com/Unosquare-CoE-JavaScript/sebastian-rodriguez/1_9_course-building-distributed-applications-with-go/app/service"
)

func main() {
	log.Run("./app.log")

	host, port := "localhost", "3001"
	serviceAddress := fmt.Sprintf("http://%v:%v", host, port)

	var r registry.Registration
	r.ServiceName = registry.LogService
	r.ServiceURL = serviceAddress

	ctx, err := service.Start(context.Background(), host, port, r, log.RegisterHandler)

	if err != nil {
		stlog.Fatal(err)
	}

	<-ctx.Done()

	fmt.Println("Shutting down log service...")
}
