package main

func betterAverange(scores ...float64) float64 {
	var counter float64
	for _, score := range scores {
		counter += score
	}
	return counter / float64(len(scores))
}

func findPet(pets map[string]string, pet string) bool {
	// for petName := range pets {
	// 	if pet == petName {
	// 		return true
	// 	}
	// }
	// return false

	// Short implementation
	_, exists := pets[pet]
	return exists
}

// var initialGroceryList = []string{
// 	"Lemon",
// 	"Tomato",
// 	"Cucumber",
// 	"Milk",
// }

func addGroceryToList(groceryList []string, groceries ...string) []string {
	return append(groceryList, groceries...)
}

// func exec3(groceries, newGrocery ...string) []string {
// 	groceries = append(groceries, newGrocery...)
// 	return groceries
// }
