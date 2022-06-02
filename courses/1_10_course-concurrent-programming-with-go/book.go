package main

import "fmt"

type Book struct {
	ID            int
	Title         string
	Author        string
	YearPublished int
}

func (b Book) String() string {
	return fmt.Sprintf("%d: %s, %s (%d)", b.ID, b.Title, b.Author, b.YearPublished)
}

var books = []Book{
	{1, "The Hitchhiker's Guide to the Galaxy", "Douglas Adams", 1979},
	{2, "The Restaurant at the End of the Universe", "Douglas Adams", 1980},
	{3, "Mostly Harmless", "Douglas Adams", 1992},
	{4, "The Hobbit", "J.R.R. Tolkien", 1937},
	{5, "The Fellowship of the Ring", "J.R.R. Tolkien", 1954},
	{6, "The Two Towers", "J.R.R. Tolkien", 1954},
	{7, "The Return of the King", "J.R.R. Tolkien", 1955},
	{8, "The Silmarillion", "J.R.R. Tolkien", 1977},
	{9, "The Lord of the Rings", "J.R.R. Tolkien", 1954},
	{10, "One Hundred Years of Solitude", "Gabriel Garcia Marquez", 1967},
}
