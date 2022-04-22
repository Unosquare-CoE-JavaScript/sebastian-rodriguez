export class Rectangle {
  public get height(): number {
    return this._height;
  }

  public set height(value: number) {
    this._height = value;
  }

  public get width(): number {
    return this._width;
  }

  public set width(value: number) {
    this._width = value;
  }

  constructor(protected _width: number, protected _height: number) {}

  get area(): number {
    return this._height * this._width;
  }

  toString(): string {
    return `Rectangle with width: ${this.width}, height: ${this.height}`;
  }
}

export class Square extends Rectangle {
  // set width(value: number) {
  //   this._width = this._height = this._side = value;
  // }

  // set height(value: number) {
  //   this._width = this._height = this._side = value;
  // }

  constructor(private _side: number) {
    super(_side, _side);
  }

  toString(): string {
    return `Square with side: ${this._side}`;
  }
}
