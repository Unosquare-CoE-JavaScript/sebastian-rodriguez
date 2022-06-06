package main

import "fmt"

// Describer prints out a entity description
type Describer interface {
	describe() string
}

// User is a user type
type User struct {
	ID                         int
	FirstName, LastName, Email string
}

// Group represent a group of users
type Group struct {
	ID             int
	Role           string
	Users          []User
	NewestUser     User
	SpaceAvailable bool
}

func describeUser(u User) string {
	return fmt.Sprintf("ID: %d\nFirst Name: %s\nLast Name: %s\nEmail: %s", u.ID, u.FirstName, u.LastName, u.Email)
}

func describeGroup(ug Group) string {
	return fmt.Sprintf("This group has %d users.\nThe newest user is %s %s.\nAccepting New Users %t", len(ug.Users), ug.NewestUser.FirstName, ug.NewestUser.LastName, ug.SpaceAvailable)
}

func (u *User) describe() string {
	return fmt.Sprintf("ID: %d\nFirst Name: %s\nLast Name: %s\nEmail: %s", u.ID, u.FirstName, u.LastName, u.Email)
}

func (ug *Group) describe() string {
	return fmt.Sprintf("This group has %d users.\nThe newest user is %s %s.\nAccepting New Users %t", len(ug.Users), ug.NewestUser.FirstName, ug.NewestUser.LastName, ug.SpaceAvailable)
}

func describeOrganigrams(describer Describer) string {
	return describer.describe()
}

func main() {
	u := User{
		ID:        1,
		FirstName: "John",
		LastName:  "Doe",
		Email:     "john@doe.com",
	}

	fmt.Println("New User: ", u)
	fmt.Println("ID: ", u.ID)
	fmt.Println("First Name: ", u.FirstName)
	fmt.Println("Last Name: ", u.LastName)
	fmt.Println("Email: ", u.Email)

	fmt.Println("User Description:", describeUser(u))
	fmt.Println("User Description Method:", u.describe())

	u2 := User{
		ID:        2,
		FirstName: "Jane",
		LastName:  "Doe",
		Email:     "jane@doe.com",
	}

	u3 := User{
		ID:        3,
		FirstName: "Joe",
		LastName:  "Doe",
		Email:     "joe@doe.com",
	}

	ug := Group{
		ID:   1,
		Role: "Admin",
		Users: []User{
			u,
			u2,
			u3,
		},
		NewestUser:     u3,
		SpaceAvailable: true,
	}

	fmt.Println("Group Description:", describeGroup(ug))
	fmt.Println("Group Description Method:", ug.describe())

	// Describe through interface
	fmt.Println("Group Description Interface:", describeOrganigrams(&ug))
	fmt.Println("User Description Interface:", describeOrganigrams(&u))
}
