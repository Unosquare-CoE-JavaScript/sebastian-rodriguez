package maps

import "errors"

var (
	ErrNotFound      = errors.New("could not find the word you were looking for")
	ErrWordExists    = errors.New("could not add word because it already exists")
	ErrWordNotExists = errors.New("could not update word because it does not exists")
)

type DictionaryErr string

func (e DictionaryErr) Error() string {
	return string(e)
}
