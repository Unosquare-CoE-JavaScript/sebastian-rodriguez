export class GraphicObject {
  static count = 0;
  children: GraphicObject[];
  color: any | undefined;
  get name() {
    return this._name;
  }

  constructor(private _name = 'Group ' + GraphicObject.count++) {
    this.children = [];
    this.color = undefined;
  }

  print(buffer: any[], depth: any) {
    buffer.push('*'.repeat(depth));
    if (depth > 0) {
      buffer.push(' ');
    }
    if (this.color) {
      buffer.push(this.color + ' ');
    }
    buffer.push(this.name);
    buffer.push('\n');

    for (let child of this.children) {
      child.print(buffer, depth + 1);
    }
  }

  toString() {
    const buffer: any[] = [];
    this.print(buffer, 0);
    return buffer.join('');
  }
}

export class Circle extends GraphicObject {
  constructor(public color: string) {
    super('Circle');
  }
}

export class Square extends GraphicObject {
  constructor(public color: string) {
    super('Square');
  }
}
