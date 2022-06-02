export class FormattedText {
  caps: any[];
  constructor(public plainText: any) {
    this.plainText = plainText;
    this.caps = new Array(plainText.length).map(() => false);
  }

  capitalize(start: number, end: number) {
    for (let i = start; i <= end; ++i) {
      this.caps[i] = true;
    }
  }

  toString() {
    let buffer = [];
    for (let [index, value] of [...this.plainText].entries()) {
      let c = this.plainText[index];
      buffer.push(this.caps[index] ? c.toUpperCase() : c);
    }
    return buffer.join('');
  }
}

// this would work better as a nested class
export class TextRange {
  capitalize: boolean;
  constructor(public start: number, public end: number) {
    this.capitalize = false;
    // other formatting options here
  }

  covers(position: number) {
    return position >= this.start && position <= this.end;
  }
}

export class BetterFormattedText {
  formatting: any[];
  constructor(public plainText: any) {
    this.formatting = [];
  }

  getRange(start: number, end: number) {
    let range = new TextRange(start, end);
    this.formatting.push(range);
    return range;
  }

  toString() {
    let buffer = [];
    for (let i in this.plainText) {
      let c = this.plainText[i];
      for (let range of this.formatting) {
        if (range.covers(i) && range.capitalize) c = c.toUpperCase();
      }
      buffer.push(c);
    }
    return buffer.join('');
  }
}
