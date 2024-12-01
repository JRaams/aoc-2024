import Matrix from "./matrix.ts";

export class Vector {
  public items: number[];

  constructor(...items: number[]) {
    this.items = items;
  }

  public add(other: Vector): Vector {
    if (this.items.length !== other.items.length) {
      throw new Error("Cannot add vectors of different sizes");
    }
    const result: number[] = this.items.slice();

    for (let i = 0; i < result.length; i++) {
      result[i] += other.items[i];
    }

    return new Vector(...result);
  }

  public subtract(other: Vector): Vector {
    if (this.items.length !== other.items.length) {
      throw new Error("Cannot add vectors of different sizes");
    }
    const result: number[] = this.items.slice();

    for (let i = 0; i < result.length; i++) {
      result[i] -= other.items[i];
    }

    return new Vector(...result);
  }

  public scale(scalar: number): Vector {
    const nextItems: number[] = Array(this.items.length).fill(0);

    for (let i = 0; i < this.items.length; i++) {
      nextItems[i] = this.items[i] * scalar;
    }

    return new Vector(...nextItems);
  }

  public cross3D(other: Vector): Vector {
    if (this.items.length !== 3 || other.items.length !== 3) {
      throw new Error("Can only cross Vector3s");
    }

    const [a, b, c] = this.items;
    const [d, e, f] = other.items;

    const newX = b * f - c * e;
    const newY = c * d - a * f;
    const newZ = a * e - b * d;

    return new Vector(newX, newY, newZ);
  }

  public crossMatrix3D(): Matrix {
    const [a, b, c] = this.items;
    return new Matrix(3, 3, [
      [0, -c, b],
      [c, 0, -a],
      [-b, a, 0],
    ]);
  }

  public apply(m: Matrix): Vector {
    const newItems: number[] = Array(this.items.length).fill(0);

    for (let i = 0; i < this.items.length; i++) {
      let sum = 0;

      for (let j = 0; j < this.items.length; j++) {
        const vecVal = this.items[j];
        const matVal = m.values[i][j];
        sum += vecVal * matVal;
      }

      newItems[i] = sum;
    }

    return new Vector(...newItems);
  }

  public dotProduct(): number {
    let result = 0;

    for (let i = 0; i < this.items.length; i++) {
      result += this.items[i];
    }

    return result;
  }

  public length(): number {
    return Math.sqrt(this.dotProduct());
  }

  public normalize(): Vector {
    const length = this.length();
    const items = this.items.slice();

    for (let i = 0; i < items.length; i++) {
      items[i] /= length;
    }

    return new Vector(...items);
  }
}
