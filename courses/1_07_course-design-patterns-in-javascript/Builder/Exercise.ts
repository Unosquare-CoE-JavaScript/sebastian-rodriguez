export class CodeBuilder {
  protected classProperties: string[] = [];
  constructor(protected className: string) {}

  addField(fieldName: string): CodeBuilder {
    this.classProperties.push(fieldName);
    return this;
  }

  private fillProperties(): string {
    return this.classProperties.join(', ');
  }

  private fillContent(): string {
    return this.classProperties
      .map((fieldName) => `    this.${fieldName} = ${fieldName};`)
      .join('\n');
  }

  toString(): string {
    return `class ${this.className} {
  constructor(${this.fillProperties()}) {
${this.fillContent()}
  }
};`;
  }
}

export class AllNewClassBuilder {
  constructor(protected newClass = new Class()) {}

  get field(): ClassBuilderFields {
    return new ClassBuilderFields(this.newClass);
  }

  addClassName(className: string): AllNewClassBuilder {
    this.newClass.className = className;
    return this;
  }

  build() {
    return this.newClass;
  }
}

export class ClassBuilderFields extends AllNewClassBuilder {
  constructor(newClass: Class) {
    super(newClass);
  }

  addField(fieldName: string): ClassBuilderFields {
    this.newClass.fields = [...this.newClass.fields, fieldName];
    return this;
  }
}

export class Class {
  counter = 0;
  private _fields: string[] = [];
  constructor(public className: string = '') {
    ++this.counter;
    this.className = className;
  }

  get fields(): string[] {
    return this._fields;
  }

  set fields(fields: string[]) {
    this._fields = fields;
  }
}
