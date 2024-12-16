export class Node {
  y: number;
  x: number;
  dy: number;
  dx: number;
  steps: number;
  distance: number;
  path: Node[];

  constructor(
    y: number,
    x: number,
    dy: number,
    dx: number,
    steps: number,
    distance: number,
    path: Node[]
  ) {
    this.y = y;
    this.x = x;
    this.dy = dy;
    this.dx = dx;
    this.steps = steps;
    this.distance = distance;
    this.path = path;
  }

  public toString() {
    return `${this.y}_${this.x}_${this.dy}_${this.dx}`;
  }
}
