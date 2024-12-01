/**
Copyright (c) 2020 Florent Catiau-Tristant
Copyright (c) 2012, 2018 Matthias Ferch

Project initiated by Matthias Ferch
Original library: https://github.com/matthiasferch/tsm

Forked and improved by Florent Catiau-Tristant
Project homepage: https://github.com/kapcash/tsmatrix

This software is provided 'as-is', without any express or implied
warranty. In no event will the authors be held liable for any damages arising from the use of this software.

Permission is granted to anyone to use this software for any purpose,
including commercial applications, and to alter it and redistribute it
freely, subject to the following restrictions:

   1. The origin of this software must not be misrepresented; you must not
   claim that you wrote the original software. If you use this software
   in a product, an acknowledgment in the product documentation would be
   appreciated but is not required.

   2. Altered source versions must be plainly marked as such, and must not
   be misrepresented as being the original software.

   3. This notice may not be removed or altered from any source
   distribution.

 */

export default class Matrix {
  /** Number of rows of the matrix */
  private _rows: number;
  /** Number of columns of the matrix */
  private _columns: number;
  /** Values of the matrix as a two dimensional array */
  private _values: number[][];

  constructor(rows: number, columns: number, values?: number[][]) {
    this._rows = Math.max(rows, 1);
    this._columns = Math.max(columns, 1);
    // Create matrix filled with 0 by default
    this._values = new Array<number[]>(this._rows).fill([]).map(() =>
      new Array<number>(this._columns).fill(0)
    );

    if (values) {
      this.values = values;
    }
  }

  get rows(): number {
    return this._rows;
  }
  get columns(): number {
    return this._columns;
  }
  get values(): number[][] {
    return this._values;
  }

  /**
   * Set values into the matrix.
   * If the parameters matrix is to wide, the values are cropped to the current matrix size.
   * It the parameters matrix is to small, remaining cells will be filled with 0.
   * @param newValues Arrays of new values.
   */
  set values(newValues: number[][]) {
    const minRow = Math.min(newValues.length, this.rows);
    const minCol = Math.min(newValues[0].length, this.columns);
    for (let r = 0; r < minRow; r++) {
      for (let c = 0; c < minCol; c++) {
        this.values[r][c] = newValues[r][c];
      }
    }
  }

  /**
   * Get a matrix value, from its position
   * @param row Matrix line, from 0 to `rows`
   * @param col Matric column, from 0 to `columns`
   */
  at(row: number, col: number): number {
    return this.values[row][col];
  }

  /**
   * Sets all matrix values to 0
   */
  reset(): void {
    this.values = this.values.map((row) => row.map(() => 0));
  }

  /**
   * Add an new column to the matrix, filled with 0
   */
  addAColumn(): Matrix {
    return new Matrix(this.rows, this.columns + 1, this.values);
  }

  /**
   * Add an new row to the matrix, filled with 0
   */
  addARow(): Matrix {
    return new Matrix(this.rows + 1, this.columns, this.values);
  }

  /**
   * Check if two matrix are equals, value by value
   * @param mat The matrix against to check equality
   */
  equals(mat: Matrix): boolean {
    // Reduce on rows -> reduce on columns -> if a value != then false!
    return (this.rows === mat.rows && this.columns === mat.columns) &&
      this.values.reduce( // Rows
        (eql: boolean, row, i) =>
          eql && row.reduce( // Columns (real values)
            (eql2: boolean, val, j) => eql2 && mat.at(i, j) === val,
            eql,
          ),
        true,
      );
  }

  /**
   * Sets the matrix as an identity matrix
   */
  setAsIdentity() {
    if (this.rows !== this.columns) {
      throw new Error("Dimension error! The matrix isn't squared!");
    }
    this.values.forEach((row, i) => {
      row.forEach((_, j) => {
        this.values[i][j] = i === j ? 1 : 0;
      });
    });
    return this;
  }

  /**
   * Gets an identity matrix (1 on diagonal)
   * @param dimension Dimension of the squared matrix
   */
  static identity(dimension: number): Matrix {
    if (dimension < 1) {
      throw Error("Dimension error! Matrix dimension must be positive.");
    }
    return new Matrix(dimension, dimension).setAsIdentity();
  }

  add(other: Matrix): Matrix {
    const result = new Matrix(this.rows, this.columns);

    for (let y = 0; y < this.rows; y++) {
      for (let x = 0; x < this.columns; x++) {
        result.values[y][x] = this.at(y, x) + other.at(y, x);
      }
    }

    return result;
  }

  subtract(other: Matrix): Matrix {
    const result = new Matrix(this.rows, this.columns);

    for (let y = 0; y < this.rows; y++) {
      for (let x = 0; x < this.columns; x++) {
        result.values[y][x] = this.at(y, x) - other.at(y, x);
      }
    }

    return result;
  }

  multiply(other: Matrix): Matrix {
    if (this.columns !== other.rows) {
      throw new Error("Matrix A.cols must be Matrix B.rows");
    }
    const m = new Matrix(this.rows, other.columns);
    m.values = m.values.map((row, i) => {
      return row.map((_, j) => {
        return this.values[i].reduce(
          (sum, elm, k) => sum + (elm * other.at(k, j)),
          0,
        );
      });
    });
    return m;
  }

  scale(scalar: number): Matrix {
    const result = new Matrix(this.rows, this.columns);

    for (let y = 0; y < this.rows; y++) {
      for (let x = 0; x < this.columns; x++) {
        result.values[y][x] = this.at(y, x) * scalar;
      }
    }

    return result;
  }

  /**
   * Get the position, from its matrix value
   * @param value The value to search
   * @return The position of the value, or -1 if not found
   */
  indexOf(value: number): [number, number] {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.columns; j++) {
        if (this.values[i][j] === value) return [i, j];
      }
    }

    return [-1, -1];
  }

  /**
   * Computes the maximum value of the matrix
   * @return The maximum value
   */
  max(): number {
    return this.values.reduce((max, row) => Math.max(max, ...row), -Infinity);
  }

  /**
   * Computes the minimum value of the matrix
   * @return The minimum value
   * @throws Error if the matrix is empty
   */
  min(): number {
    return this.values.reduce((min, row) => Math.min(min, ...row), Infinity);
  }

  /**
   * Rounds all matrix values to the nearest integer
   * @return A new matrix with the rounded values
   */
  round(): Matrix {
    return new Matrix(
      this.rows,
      this.columns,
      this.values.map((row) => row.map((val) => Math.round(val))),
    );
  }

  /**
   * Computes the determinant of the matrix
   * @throws Error if the matrix is not squared
   */
  determinant(): number {
    if (this.rows !== this.columns) {
      throw new Error("Dimension error! The matrix isn't squared!");
    }
    if (this.rows === this.columns && this.columns === 1) {
      return this.values[0][0];
    }

    let det = 0;
    let sign = 1;
    if (this.rows === 2) {
      det = this.values[0][0] * this.values[1][1] -
        this.values[1][0] * this.values[0][1];
    } else {
      for (let i = 0; i < this.rows; i++) {
        const minor = this.getCofactor(0, i);
        det += sign * this.at(0, i) * minor.determinant();
        sign = -sign;
      }
    }
    return det;
  }

  /**
   * Gets a cofactor matrix
   * @param row The row to omit in the matrix
   * @param col The column to omit in the matrix
   * @return The cofactor matrix sized (r-1)x(c-1)
   */
  getCofactor(row: number, col: number): Matrix {
    return new Matrix(
      this.rows - 1,
      this.columns - 1,
      this.values
        .filter((_, i) => i !== row) // Remove the unnecessary row
        .map((c) => c.filter((_, i) => i !== col)),
    );
  }

  /**
   * Computes a transposed the matrix
   * @return A new matrix sized (columns) x (rows)
   */
  transpose(): Matrix {
    return new Matrix(
      this.columns,
      this.rows,
      new Array<number[]>(this.columns).fill([])
        .map((_, i) =>
          new Array<number>(this.rows).fill(0).map((_, j) => this.at(j, i))
        ),
    );
  }

  /**
   * Computes the inversed matrix
   * @return A new matrix inversed
   */
  inverse() {
    if (this.rows !== this.columns) {
      throw new Error("Dimension error! The matrix isn't squared!");
    }
    const det = this.determinant();
    if (det === 0) throw new Error("Determinant is 0, can't compute inverse.");

    // Get cofactor matrix: i.e. for each matrix value, get the cofactor's determinant
    const cofactorMatrix = new Matrix(
      this.rows,
      this.columns,
      this.values.map((row, i) =>
        row.map((_, j) => {
          const sign = Math.pow(-1, i + j);
          return sign * this.getCofactor(i, j).determinant();
        })
      ),
    );
    // Transpose it
    const transposedCofactor = cofactorMatrix.transpose();
    // Compute inverse of transposed / determinant on each value
    return new Matrix(
      this.rows,
      this.columns,
      this.values.map((row, i) =>
        row.map((_, j) => transposedCofactor.at(i, j) / det)
      ),
    );
  }

  toString(): string {
    return `[${this.values.map((row) => `[${row.join(", ")}]`).join(",\n")}]`;
  }
}
