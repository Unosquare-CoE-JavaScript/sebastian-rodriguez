export class Tag {
  static indentSize = 2;
  public children: Tag[];
  constructor(private name: string = '', private text: string = '') {
    this.children = [];
  }

  toStringImpl(indent: number): string {
    const html = [];
    let i = ' '.repeat(indent * Tag.indentSize);
    html.push(`${i}<${this.name}>\n`);
    if (this.text.length > 0) {
      html.push(' '.repeat(Tag.indentSize * (indent + 1)));
      html.push(this.text);
      html.push('\n');
    }
    for (const child of this.children) {
      html.push(child.toStringImpl(indent + 1));
    }
    html.push(`${i}</${this.name}>\n`);
    return html.join('');
  }

  toString(): string {
    return this.toStringImpl(0);
  }

  static create(name: string): HtmlBuilder {
    return new HtmlBuilder(name);
  }
}

export class HtmlBuilder {
  public root: Tag;
  constructor(private rootName: string) {
    this.root = new Tag(rootName);
  }

  addChild(childName: string, text: string): void {
    const child = new Tag(childName, text);
    this.root.children.push(child);
  }

  addChildFluent(childName: string, text: string): HtmlBuilder {
    this.addChild(childName, text);
    return this;
  }

  toString(): string {
    return this.root.toString();
  }

  clear(): void {
    this.root = new Tag(this.rootName);
  }

  build(): Tag {
    return this.root;
  }
}

const hello = 'Hello';
export let htmlP: string[] = [];
htmlP.push(`<h1>`);
htmlP.push(hello);
htmlP.push(`</h1>`);

const words: string[] = ['Hello', 'World', 'Vitest'];
export let htmlUl: string[] = [];
htmlUl.push(`<ul>\n`);
for (let word of words) {
  htmlUl.push(`  <li>${word}</li>\n`);
}
htmlUl.push(`</ul>`);
