package maps

import "fmt"

// Dictionary is a map of string keys to string values.
type Dictionary map[string]string

func (d Dictionary) Search(key string) (value string, err error) {
	value, exist := d[key]
	if !exist {
		err = ErrNotFound
	}
	return value, err
}

func (d Dictionary) Add(key, value string) error {
	_, exist := d[key]
	fmt.Println("exist ===>", exist)
	if exist {
		fmt.Println("vou a retornar un error ===>", exist)
		return ErrWordExists
	}
	d[key] = value
	return nil
}

func (d Dictionary) Update(key, value string) error {
	_, exist := d[key]
	if !exist {
		return ErrWordNotExists
	}
	d[key] = value
	return nil
}

func (d Dictionary) Delete(key string) {
	delete(d, key)
}
