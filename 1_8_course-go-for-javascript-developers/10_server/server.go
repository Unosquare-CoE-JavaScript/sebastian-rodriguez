package main

import (
	"fmt"
	"html/template"
	"log"
	"net/http"
)

func homeHandler(w http.ResponseWriter, r *http.Request) {
	fmt.Println("Hello Home")
}

type PageVariables struct {
	PageTitle string
	PageTodos []Todo
}

type Todo struct {
	ID      int
	Title   string
	Content string
}

var todos []Todo = []Todo{
	{ID: 1, Title: "Todo One", Content: "This is the first todo."},
	// {ID: 2, Title: "Todo Two", Content: "This is the second todo."},
	// {ID: 3, Title: "Todo Three", Content: "This is the third todo."},
}

func todosHandler(w http.ResponseWriter, r *http.Request) {

	pageVariables := PageVariables{
		PageTitle: "Todo List",
		PageTodos: todos,
	}

	t, err := template.ParseFiles("todos.html")

	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		log.Print("Template parsing error: ", err)
	}

	err = t.Execute(w, pageVariables)
}

func addTodoHandler(w http.ResponseWriter, r *http.Request) {
	err := r.ParseForm()

	if err != nil {
		log.Print("Error parsing form: ", err)
		http.Error(w, err.Error(), http.StatusBadRequest)
	}

	todo := Todo{
		ID:      len(todos) + 1,
		Title:   r.PostFormValue("title"),
		Content: r.PostFormValue("content"),
	}

	todos = append(todos, todo)

	log.Print(todos)
	http.Redirect(w, r, "/todos", http.StatusFound)
}

func main() {
	http.HandleFunc("/", homeHandler)
	http.HandleFunc("/todos", todosHandler)
	http.HandleFunc("/add-todo", addTodoHandler)

	fmt.Println("Server is running in port 8080")
	log.Fatal(http.ListenAndServe(":8080", nil))
}
