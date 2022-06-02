package structs

import (
	"testing"
)

func TestPerimeter(t *testing.T) {
	type args struct {
		rectangle Rectangle
	}
	tests := []struct {
		name string
		args args
		want float64
	}{
		// TODO: Add test cases.
		{
			name: "Test Rectangle Perimeter",
			args: args{
				rectangle: Rectangle{
					Width:  10.0,
					Height: 10.0,
				},
			},
			want: 40.0,
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if got := Perimeter(tt.args.rectangle); got != tt.want {
				t.Errorf("Perimeter() = %v, want %v", got, tt.want)
			}
		})
	}
}

func Test_Area(t *testing.T) {
	type rectangleArgs struct {
		width float64
		height float64
	}
	type circleArgs struct {
		radius float64
	}
	rectangleTests := []struct {
		name string
		args rectangleArgs
		want float64
	}{
		{
			name: "Test Rectangle Area",
			args: rectangleArgs{
				width:  10.0,
				height: 10.0,
			},
			want: 100.0,
		},
	}
	circleTests := []struct {
		name string
		args circleArgs
		want float64
	}{
		{
			name: "Test Circle Area",
			args: circleArgs{
				radius: 10.0,
			},
			want: 314.1592653589793,
		},
	}
	for _, tt := range rectangleTests {
		t.Run(tt.name, func(t *testing.T) {
			shape := Rectangle{
				Width:  tt.args.width,
				Height: tt.args.height,
			}
			if got := shape.Area(); got != tt.want {
				t.Errorf("For rectangle shape.Area() = %v, want %v", got, tt.want)
			}
		})
	}
	for _, tt := range circleTests {
		t.Run(tt.name, func(t *testing.T) {
			shape := Circle{
				Radius: tt.args.radius,
			}
			if got := shape.Area(); got != tt.want {
				t.Errorf("For circle shape.Area() = %v, want %v", got, tt.want)
			}
		})
	}
}

func Test_ShapeArea(t *testing.T) {
	t.Parallel()
	type args struct {
		shape Shape
	}
	tests := []struct {
		name string
		args args
		want float64
	}{
		{
			name: "Test Rectangle Area",
			args: args{
				shape: Rectangle{
					Width:  10.0,
					Height: 10.0,
				},
			},
			want: 100.0,
		},
		{
			name: "Test Circle Area",
			args: args{
				shape: Circle{
					Radius: 10.0,
				},
			},
			want: 314.1592653589793,
		},
		{
			name: "Test Triangle Area",
			args: args{
				shape: Triangle{
					Base:   10.0,
					Height: 10.0,
				},
			},
			want: 50.0,
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if got := tt.args.shape.Area(); got != tt.want {
				t.Errorf("shape.Area() = %v, want %v", got, tt.want)
			}
		})
	}
}

func TestArea(t *testing.T) {

	checkArea := func(t *testing.T, shape Shape, want float64) {
		t.Helper()
		got := shape.Area()
		if got != want {
			t.Errorf("%#v got %.2f want %.2f", shape, got, want)
		}
	}

	t.Run("Rectangle", func(t *testing.T) {
		rectangle := Rectangle{Width: 12, Height: 6}
		checkArea(t, rectangle, 72.0)
	})

	t.Run("Circle", func(t *testing.T) {
		circle := Circle{Radius: 10}
		checkArea(t, circle, 314.1592653589793)
	})
}