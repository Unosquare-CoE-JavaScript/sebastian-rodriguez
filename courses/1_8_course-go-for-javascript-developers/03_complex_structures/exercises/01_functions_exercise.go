package main

func averange(values ...float64) float64 {
	var counter float64
	for _, value := range values {
		counter += value
	}
	return counter / float64(len(values))
}
