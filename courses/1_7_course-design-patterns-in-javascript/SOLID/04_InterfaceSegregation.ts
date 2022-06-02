export interface IDocument {}

export interface IMachine {
  print(document: IDocument): void;
  fax(document: IDocument): void;
  scan(document: IDocument): void;
}

export interface IPrinter {
  print(document: IDocument): void;
}

export interface IFax {
  fax(document: IDocument): void;
}

export interface IScanner {
  scan(document: IDocument): void;
}

export class NotImplementedError extends Error {
  constructor(name: string) {
    const message = `${name} is not implemented`;
    super(message);
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, NotImplementedError);
    }
  }
}

export class MultiFunctionPrinter implements IMachine {
  public print(document: IDocument): void {
    console.log('printing...');
  }

  public fax(document: IDocument): void {
    console.log('faxing...');
  }

  public scan(document: IDocument): void {
    console.log('scanning...');
  }
}

export class OldFashionedPrinter implements IMachine {
  public print(document: IDocument): void {
    console.log('printing...');
  }

  public fax(document: IDocument): void {
    console.warn('this broke the principle of least surprise');
    throw new NotImplementedError('OldFashionedPrinter.fax');
  }

  public scan(document: IDocument): void {
    console.warn('this broke the principle of least surprise');
    throw new NotImplementedError('OldFashionedPrinter.scan');
  }
}

export class NewMultiFunctionPrinter
  implements IPrinter, IFax, IScanner
{
  public print(document: IDocument): void {
    console.log('printing...');
  }

  public fax(document: IDocument): void {
    console.log('faxing...');
  }

  public scan(document: IDocument): void {
    console.log('scanning...');
  }
}

export class NewOldFashionedPrinter implements IPrinter {
  public print(document: IDocument): void {
    console.log('printing...');
  }
}
