package propertybt

import (
	"fmt"
	"testing"
)

var cases = []struct {
	Name   string
	Arabic int
	Roman  string
}{
	{"1 gets converted to I", 1, "I"},
	{"2 gets converted to II", 2, "II"},
	{"3 gets converted to III", 3, "III"},
	{"4 gets converted to IV (can't repeat more than 3 times)", 4, "IV"},
	{"5 gets converted to V", 5, "V"},
	{"6 gets converted to VI", 6, "VI"},
	{"7 gets converted to VII", 7, "VII"},
	{"8 gets converted to VIII", 8, "VIII"},
	{"9 gets converted to IX", 9, "IX"},
	{"10 gets converted to X", 10, "X"},
	{"14 gets converted to XIV", 14, "XIV"},
	{"18 gets converted to XVIII", 18, "XVIII"},
	{"20 gets converted to XX", 20, "XX"},
	{"39 gets converted to XXXIX", 39, "XXXIX"},
	{"40 gets converted to XL", 40, "XL"},
	{"47 gets converted to XLVII", 47, "XLVII"},
	{"49 gets converted to XLIX", 49, "XLIX"},
	{"50 gets converted to L", 50, "L"},
	{"1984 gets converted to MCMLXXXIV", 1984, "MCMLXXXIV"},
	{"3999 gets converted to MMMCMXCIX", 3999, "MMMCMXCIX"},
	{"2014 gets converted to MMXIV", 2014, "MMXIV"},
	{"1006 gets converted to MVI", 1006, "MVI"},
	{"798 gets converted to DCCXCVIII", 798, "DCCXCVIII"},
}

func TestRomanNumerals(t *testing.T) {

	cases := []struct {
		Arabic int
		Roman  string
	}{
		{Arabic: 1, Roman: "I"},
		{Arabic: 2, Roman: "II"},
		{Arabic: 3, Roman: "III"},
		{Arabic: 4, Roman: "IV"},
		{Arabic: 5, Roman: "V"},
		{Arabic: 6, Roman: "VI"},
		{Arabic: 7, Roman: "VII"},
		{Arabic: 8, Roman: "VIII"},
		{Arabic: 9, Roman: "IX"},
		{Arabic: 10, Roman: "X"},
		{Arabic: 14, Roman: "XIV"},
		{Arabic: 18, Roman: "XVIII"},
		{Arabic: 20, Roman: "XX"},
		{Arabic: 39, Roman: "XXXIX"},
		{Arabic: 40, Roman: "XL"},
		{Arabic: 47, Roman: "XLVII"},
		{Arabic: 49, Roman: "XLIX"},
		{Arabic: 50, Roman: "L"},
		{Arabic: 1984, Roman: "MCMLXXXIV"},
		{Arabic: 3999, Roman: "MMMCMXCIX"},
		{Arabic: 2014, Roman: "MMXIV"},
		{Arabic: 1006, Roman: "MVI"},
		{Arabic: 798, Roman: "DCCXCVIII"},
	}

	for _, test := range cases {
		t.Run(fmt.Sprintf("%d gets converted to %q", test.Arabic, test.Roman), func(t *testing.T) {
			got := ConvertToRoman(test.Arabic)
			if got != test.Roman {
				t.Errorf("got %q, want %q", got, test.Roman)
			}
		})
	}

	// t.Run("1 gets converted to I", func(t *testing.T) {
	// 	got := ConvertToRoman(1)
	// 	want := "I"

	// 	if got != want {
	// 		t.Errorf("got %q want %q", got, want)
	// 	}
	// })

	// t.Run("2 gets converted to II", func(t *testing.T) {
	// 	got := ConvertToRoman(2)
	// 	want := "II"

	// 	if got != want {
	// 		t.Errorf("got %q want %q", got, want)
	// 	}
	// })
}

func TestConvertingToArabic(t *testing.T) {
	// cases := []struct {
	// 	Arabic int
	// 	Roman  string
	// }{
	// 	{Arabic: 1, Roman: "I"},
	// 	{Arabic: 2, Roman: "II"},
	// 	{Arabic: 3, Roman: "III"},
	// 	{Arabic: 4, Roman: "IV"},
	// 	{Arabic: 5, Roman: "V"},
	// 	{Arabic: 6, Roman: "VI"},
	// 	{Arabic: 7, Roman: "VII"},
	// 	{Arabic: 8, Roman: "VIII"},
	// 	{Arabic: 9, Roman: "IX"},
	// 	{Arabic: 10, Roman: "X"},
	// 	{Arabic: 14, Roman: "XIV"},
	// 	{Arabic: 18, Roman: "XVIII"},
	// 	{Arabic: 20, Roman: "XX"},
	// 	{Arabic: 39, Roman: "XXXIX"},
	// 	{Arabic: 40, Roman: "XL"},
	// 	{Arabic: 47, Roman: "XLVII"},
	// 	{Arabic: 49, Roman: "XLIX"},
	// 	{Arabic: 50, Roman: "L"},
	// 	{Arabic: 1984, Roman: "MCMLXXXIV"},
	// 	{Arabic: 3999, Roman: "MMMCMXCIX"},
	// 	{Arabic: 2014, Roman: "MMXIV"},
	// 	{Arabic: 1006, Roman: "MVI"},
	// 	{Arabic: 798, Roman: "DCCXCVIII"},
	// }

	for _, test := range cases {
		t.Run(fmt.Sprintf("%q gets converted to %d", test.Roman, test.Arabic), func(t *testing.T) {
			got := ConvertToArabic(test.Roman)
			if got != test.Arabic {
				t.Errorf("got %d want %d", got, test.Arabic)
			}
		})
	}
}
