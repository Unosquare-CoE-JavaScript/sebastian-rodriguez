package pointer

import "testing"

func TestBitcoin_String(t *testing.T) {
	tests := []struct {
		name string
		b    Bitcoin
		want string
	}{
		// TODO: Add test cases.
		{
			name: "Test Bitcoin String",
			b:    Bitcoin(10),
			want: "10 BTC",
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if got := tt.b.String(); got != tt.want {
				t.Errorf("Bitcoin.String() = %v, want %v", got, tt.want)
			}
		})
	}
}
