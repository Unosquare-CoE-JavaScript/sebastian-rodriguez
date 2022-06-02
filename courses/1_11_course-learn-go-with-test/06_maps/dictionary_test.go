package maps

import (
	"testing"
)

func assertValue(t *testing.T, testName string, gotValue string, wantValue string) {
	t.Helper()
	if gotValue != wantValue {
		t.Errorf("Test name: %v gotValue = %v, want %v", testName, gotValue, wantValue)
	}
}

func assertError(t *testing.T, testName string, err error, wantExist bool) {
	t.Helper()
	if (err != nil) != wantExist {
		t.Errorf("err => %v", err)
		t.Errorf("Test name: %v shouldError = %v, want %v", testName, err != nil, wantExist)
		return
	}
}

func TestSearch(t *testing.T) {
	type args struct {
		d   Dictionary
		key string
	}
	tests := []struct {
		name      string
		args      args
		wantValue string
		wantError bool
	}{
		// TODO: Add test cases.
		{
			name: "find key",
			args: args{
				d:   Dictionary{"test": "this is a test"},
				key: "test",
			},
			wantValue: "this is a test",
			wantError: false,
		},
		{
			name: "not find key",
			args: args{
				d:   Dictionary{"test": "this is a test"},
				key: "not_test",
			},
			wantValue: "",
			wantError: true,
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			gotValue, err := tt.args.d.Search(tt.args.key)
			assertValue(t, tt.name, gotValue, tt.wantValue)
			assertError(t, tt.name, err, tt.wantError)
		})
	}
}

func TestDictionary_Add(t *testing.T) {
	type args struct {
		key   string
		value string
	}
	tests := []struct {
		name    string
		d       Dictionary
		args    args
		wantErr bool
	}{
		// TODO: Add test cases.
		{
			name: "add key",
			d:    Dictionary{},
			args: args{
				key:   "test",
				value: "this is a test",
			},
			wantErr: false,
		},
		{
			name: "add key twice",
			d:    Dictionary{"test": "this is a test"},
			args: args{
				key:   "test",
				value: "this is a second test",
			},
			wantErr: true,
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			err := tt.d.Add(tt.args.key, tt.args.value)
			assertError(t, tt.name, err, tt.wantErr)
		})
	}
}

func TestDictionary_Update(t *testing.T) {
	type args struct {
		key   string
		value string
	}
	tests := []struct {
		name    string
		d       Dictionary
		args    args
		wantErr bool
	}{
		{
			name: "update key",
			d:    Dictionary{"test": "this is a test"},
			args: args{
				key:   "test",
				value: "this is a second test",
			},
			wantErr: false,
		},
		{
			name: "update key does not exist",
			d:    Dictionary{},
			args: args{
				key:   "test",
				value: "this is a second test",
			},
			wantErr: true,
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			err := tt.d.Update(tt.args.key, tt.args.value)
			assertError(t, tt.name, err, tt.wantErr)
		})
	}
}

func TestDictionary_Delete(t *testing.T) {
	type args struct {
		key string
	}
	tests := []struct {
		name string
		d    Dictionary
		args args
	}{
		// TODO: Add test cases.
		{
			name: "delete key",
			d:    Dictionary{"test": "this is a test"},
			args: args{
				key: "test",
			},
		},
		{
			name: "delete key does not exist",
			d:    Dictionary{},
			args: args{
				key: "test",
			},
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			tt.d.Delete(tt.args.key)
		})
	}
}
