package main

const (
	englishHelloPrefix = "Hello, "
	spanishHelloPrefix = "Hola, "
	frenchHelloPrefix  = "Bonjour, "
)

func greetingPrefix(language string) (prefix string) {
	switch language {
	case "fr":
		prefix = frenchHelloPrefix
	case "es":
		prefix = spanishHelloPrefix
	case "en":
		prefix = englishHelloPrefix
	}
	return
}

func Hello(name string, language string) string {

	if name == "" {
		name = "World"
	}

	return greetingPrefix(language) + name + "!"
}

// func main() {
// 	fmt.Println(Hello("Seromarin"))
// }
