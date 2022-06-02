package pointer

import (
	"testing"
)

func assertBalance(t *testing.T, wallet *Wallet, want Bitcoin) {
	t.Helper()
	got := wallet.Balance()
	if got != want {
		t.Errorf("Wallet.Balance() = %v, want %v", got.String(), want.String())
	}
}

func TestWallet(t *testing.T) {
	type fields struct {
		balance Bitcoin
	}
	type args struct {
		amount Bitcoin
	}
	tests := []struct {
		name   string
		fields fields
		args   args
		want   Bitcoin
	}{
		// TODO: Add test cases.
		{
			name: "Test Deposit",
			fields: fields{
				balance: Bitcoin(10),
			},
			args: args{
				amount: Bitcoin(5),
			},
			want: Bitcoin(15),
		},
		{
			name: "Test Balance",
			fields: fields{
				balance: Bitcoin(10),
			},
			args: args{},
			want: Bitcoin(10),
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			w := &Wallet{
				balance: tt.fields.balance,
			}
			w.Deposit(tt.args.amount)
			assertBalance(t, w, tt.want)
		})
	}
}

func TestWallet_Withdraw(t *testing.T) {
	type fields struct {
		balance Bitcoin
	}
	type args struct {
		amount Bitcoin
	}
	tests := []struct {
		name    string
		fields  fields
		args    args
		want    Bitcoin
		wantErr bool
	}{
		// TODO: Add test cases.
		{
			name: "Test Withdraw",
			fields: fields{
				balance: Bitcoin(10),
			},
			args: args{
				amount: Bitcoin(5),
			},
			want:    Bitcoin(5),
			wantErr: false,
		},
		{
			name: "Test Withdraw Insufficient Funds",
			fields: fields{
				balance: Bitcoin(10),
			},
			args: args{
				amount: Bitcoin(15),
			},
			want:    Bitcoin(10),
			wantErr: true,
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			w := &Wallet{
				balance: tt.fields.balance,
			}
			if err := w.Withdraw(tt.args.amount); (err != nil) != tt.wantErr {
				t.Errorf("Wallet.Withdraw() error = %v, wantErr %v", err, tt.wantErr)
			}
			assertBalance(t, w, tt.want)
		})
	}
}
