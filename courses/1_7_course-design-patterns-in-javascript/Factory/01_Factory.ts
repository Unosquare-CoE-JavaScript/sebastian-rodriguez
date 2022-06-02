export enum CoordinateSystem {
  Cartesian,
  Polar,
}

export class PointFactory {
  static newCartesianPoint(x: number, y: number): Point {
    return new Point(x, y);
  }

  static newPolarPoint(r: number, theta: number): Point {
    return new Point(r * Math.cos(theta), r * Math.sin(theta));
  }
}

export class Point {
  constructor(public x: number, public y: number) {}

  /**
   * News cartesian point
   * @param x
   * @param y
   * @returns cartesian point
   * @deprecated in next version
   */
  static newCartesianPoint(x: number, y: number): Point {
    return new Point(x, y);
  }

  /**
   * News polar point
   * @param r
   * @param theta
   * @returns polar point
   * @deprecated in next version
   */
  static newPolarPoint(r: number, theta: number): Point {
    return new Point(r * Math.cos(theta), r * Math.sin(theta));
  }

  static get factory() {
    return PointFactory;
  }
}

export class PointSwitch {
  x: number;
  y: number;
  constructor(
    private a: number,
    private b: number,
    private coordinateSystem: CoordinateSystem = CoordinateSystem.Cartesian
  ) {
    switch (coordinateSystem) {
      case CoordinateSystem.Polar:
        this.x = a * Math.cos(b);
        this.y = a * Math.sin(b);
        break;
      default:
        this.x = a;
        this.y = b;
        break;
    }
  }
  // NOT AVAILABLE PATTERN
  // constructor(public x: number, public y: number) {}
  // constructor(rho: number, theta: number) {
  //   this.x = rho * Math.cos(theta);
  //   this.y = rho * Math.sin(theta);
  // }
}
