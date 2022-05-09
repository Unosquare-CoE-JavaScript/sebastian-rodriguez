package main

import (
	"log"
	"net/http"

	di "github.com/Unosquare-CoE-JavaScript/sebastian-rodriguez/1_11_course-learn-go-with-test/07_dependency_injection"
)

func main() {
	log.Fatal(http.ListenAndServe(":8080", http.HandlerFunc(di.MyGreetHandler)))
}
