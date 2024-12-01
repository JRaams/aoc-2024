export class Queue<T> {
  private elements: Record<number, T>;
  private head: number;
  private tail: number;

  constructor(...elements: T[]) {
    this.elements = { ...elements };
    this.head = 0;
    this.tail = elements.length;
  }

  public enqueue(element: T): void {
    this.elements[this.tail++] = element;
  }

  public dequeue(): T {
    const item = this.elements[this.head];
    delete this.elements[this.head];
    this.head++;
    return item;
  }

  public peek(): T | undefined {
    return this.elements[this.head];
  }

  public clear(): void {
    this.elements = {};
    this.head = 0;
    this.tail = 0;
  }

  public get length(): number {
    return this.tail - this.head;
  }

  public get isEmpty(): boolean {
    return this.length === 0;
  }
}
