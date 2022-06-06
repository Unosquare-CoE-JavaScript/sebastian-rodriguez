export class Buffer extends Array {
  // private _buffer: string = '';
  constructor(public width = 30, public height = 20) {
    super();
    this.alloc(width * height);
  }

  alloc(arg0: number) {
    // write the alloc
  }

  write(text: string, position = 0) {
    // write to the buffer
    // this._buffer = text;
  }
}

export class Viewport {
  public offset = 0;
  constructor(public buffer = new Buffer()) {}

  // high-level
  append(text: string, pos: number) {
    this.buffer.write(text, pos + this.offset);
  }

  getCharAt(index: number) {
    return this.buffer[this.offset + index];
  }
}

export class Console {
  buffer: Buffer;
  currentViewport: Viewport;
  buffers: Buffer[];
  viewports: Viewport[];
  constructor() {
    this.buffer = new Buffer();
    this.currentViewport = new Viewport(this.buffer);
    this.buffers = [this.buffer];
    this.viewports = [this.currentViewport];
  }

  // high-level
  write(text: string) {
    this.currentViewport.buffer.write(text);
  }

  // low-level
  getCharAt(index: number) {
    return this.currentViewport.getCharAt(index);
  }
}
