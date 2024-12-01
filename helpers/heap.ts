export class Heap<T extends number | string | object> {
  private _comparer: (a: T, b: T) => number;
  private _nodes: T[];
  private _leaf: T | null;

  constructor(comparer: (a: T, b: T) => number, nodes: T[], leaf?: T | null) {
    this._comparer = comparer;
    this._nodes = nodes;
    this._leaf = leaf ?? null;
  }

  public toArray(): T[] {
    return Array.from(this._nodes);
  }

  public insert(value: T): Heap<T> {
    this._nodes.push(value);
    this._heapifyUp(this.size() - 1);
    if (this._leaf === null || this._comparer(value, this._leaf) > 0) {
      this._leaf = value;
    }
    return this;
  }

  public pop(): T | null {
    if (this.isEmpty()) {
      return null;
    }

    const root = this.root();
    this._nodes[0] = this._nodes[this.size() - 1];
    this._nodes.pop();
    this._heapifyDown(0);

    if (root === this._leaf) {
      this._leaf = this.root();
    }

    return root;
  }

  public sort(): T[] {
    for (let i = this.size() - 1; i > 0; i -= 1) {
      this._swap(0, i);
      this._heapifyDownUntil(i);
    }
    return this._nodes;
  }

  public fix(): Heap<T> {
    // fix node positions
    for (let i = Math.floor(this.size() / 2) - 1; i >= 0; i -= 1) {
      this._heapifyDown(i);
    }

    // fix leaf value
    for (let i = Math.floor(this.size() / 2); i < this.size(); i += 1) {
      const value = this._nodes[i];
      if (this._leaf === null || this._comparer(value, this._leaf) > 0) {
        this._leaf = value;
      }
    }

    return this;
  }

  public isValid(): boolean {
    const isValidRecursive = (parentIndex: number): boolean => {
      let isValidLeft = true;
      let isValidRight = true;

      if (this._hasLeftChild(parentIndex)) {
        const leftChildIndex = (parentIndex * 2) + 1;
        if (this._compareAt(parentIndex, leftChildIndex) > 0) {
          return false;
        }
        isValidLeft = isValidRecursive(leftChildIndex);
      }

      if (this._hasRightChild(parentIndex)) {
        const rightChildIndex = (parentIndex * 2) + 2;
        if (this._compareAt(parentIndex, rightChildIndex) > 0) {
          return false;
        }
        isValidRight = isValidRecursive(rightChildIndex);
      }

      return isValidLeft && isValidRight;
    };

    return isValidRecursive(0);
  }

  public clone(): Heap<T> {
    return new Heap(this._comparer, this._nodes.slice(), this._leaf);
  }

  public root(): T | null {
    if (this.isEmpty()) {
      return null;
    }

    return this._nodes[0];
  }

  public leaf(): T | null {
    return this._leaf;
  }

  public size(): number {
    return this._nodes.length;
  }

  public isEmpty(): boolean {
    return this.size() === 0;
  }

  public clear(): void {
    this._nodes = [];
    this._leaf = null;
  }

  public [Symbol.iterator]() {
    let size = this.size();
    return {
      next: () => {
        size -= 1;
        return {
          value: this.pop(),
          done: size === -1,
        };
      },
    };
  }

  private _hasLeftChild(parentIndex: number): boolean {
    const leftChildIndex = (parentIndex * 2) + 1;
    return leftChildIndex < this.size();
  }

  private _hasRightChild(parentIndex: number): boolean {
    const rightChildIndex = (parentIndex * 2) + 2;
    return rightChildIndex < this.size();
  }

  private _compareAt(i: number, j: number): number {
    return this._comparer(this._nodes[i], this._nodes[j]);
  }

  private _swap(i: number, j: number): void {
    const temp = this._nodes[i];
    this._nodes[i] = this._nodes[j];
    this._nodes[j] = temp;
  }

  private _shouldSwap(parentIndex: number, childIndex: number): boolean {
    if (parentIndex < 0 || parentIndex >= this.size()) {
      return false;
    }

    if (childIndex < 0 || childIndex >= this.size()) {
      return false;
    }

    return this._compareAt(parentIndex, childIndex) > 0;
  }

  private _compareChildrenOf(parentIndex: number): number {
    if (!this._hasLeftChild(parentIndex) && !this._hasRightChild(parentIndex)) {
      return -1;
    }

    const leftChildIndex = (parentIndex * 2) + 1;
    const rightChildIndex = (parentIndex * 2) + 2;

    if (!this._hasLeftChild(parentIndex)) {
      return rightChildIndex;
    }

    if (!this._hasRightChild(parentIndex)) {
      return leftChildIndex;
    }

    const compare = this._compareAt(leftChildIndex, rightChildIndex);
    return compare > 0 ? rightChildIndex : leftChildIndex;
  }

  private _compareChildrenBefore(
    index: number,
    leftChildIndex: number,
    rightChildIndex: number,
  ): number {
    const compare = this._compareAt(rightChildIndex, leftChildIndex);

    if (compare <= 0 && rightChildIndex < index) {
      return rightChildIndex;
    }

    return leftChildIndex;
  }

  private _heapifyUp(startIndex: number): void {
    let childIndex = startIndex;
    let parentIndex = Math.floor((childIndex - 1) / 2);

    while (this._shouldSwap(parentIndex, childIndex)) {
      this._swap(parentIndex, childIndex);
      childIndex = parentIndex;
      parentIndex = Math.floor((childIndex - 1) / 2);
    }
  }

  private _heapifyDown(startIndex: number): void {
    let parentIndex = startIndex;
    let childIndex = this._compareChildrenOf(parentIndex);

    while (this._shouldSwap(parentIndex, childIndex)) {
      this._swap(parentIndex, childIndex);
      parentIndex = childIndex;
      childIndex = this._compareChildrenOf(parentIndex);
    }
  }

  private _heapifyDownUntil(index: number): void {
    let parentIndex = 0;
    let leftChildIndex = 1;
    let rightChildIndex = 2;
    let childIndex;

    while (leftChildIndex < index) {
      childIndex = this._compareChildrenBefore(
        index,
        leftChildIndex,
        rightChildIndex,
      );

      if (this._shouldSwap(parentIndex, childIndex)) {
        this._swap(parentIndex, childIndex);
      }

      parentIndex = childIndex;
      leftChildIndex = (parentIndex * 2) + 1;
      rightChildIndex = (parentIndex * 2) + 2;
    }
  }
}
