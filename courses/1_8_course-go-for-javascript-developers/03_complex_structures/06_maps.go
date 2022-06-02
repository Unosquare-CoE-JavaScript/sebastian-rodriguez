package main

import "fmt"

func mapsMain() {
	var userEmails map[int]string = make(map[int]string)

	userEmails[1] = "user1@email.com"
	userEmails[2] = "user2@email.com"

	fmt.Println(userEmails)

	newUsers := map[int]string{
		3: "Sebastian",
		4: "Juan",
		5: "Pedro",
	}

	fmt.Println(newUsers)

	fifthUser, okFifthUser := userEmails[5]
	fmt.Println(fifthUser, okFifthUser) // throw "empty" false

	if firstUser, okFirstUser := userEmails[1]; okFirstUser {
		fmt.Println(firstUser)
	} else {
		fmt.Println("User not found")
	}

	delete(userEmails, 1)
	fmt.Println(userEmails)

	for key, value := range newUsers {
		fmt.Println("newUser => ", key, value)
	}
}
