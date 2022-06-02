package helloworld

import (
	"testing"
)

func Test_Hello(t *testing.T) {
	tests := []struct {
		name      string
		helloName string
		language  string
		want      string
	}{
		// TODO: Add test cases.
		{
			name:      "Test Hello with Name",
			helloName: "Seromarin",
			language:  "en",
			want:      "Hello, Seromarin!",
		},
		{
			name:      "Test Hello without Name",
			helloName: "",
			language:  "en",
			want:      "Hello, World!",
		},
		{
			name:      "Test Hello with Name in Spanish",
			helloName: "Seromarin",
			language:  "es",
			want:      "Hola, Seromarin!",
		},
		{
			name:      "Test Hello with Name in French",
			helloName: "Seromarin",
			language:  "fr",
			want:      "Bonjour, Seromarin!",
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if got := Hello(tt.helloName, tt.language); got != tt.want {
				t.Errorf("Hello(name) = %v, want %v", got, tt.want)
			}
		})
	}
}
