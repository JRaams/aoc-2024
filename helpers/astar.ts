export abstract class AStarNode {
  x: number;
  y: number;

  neighBours: AStarNode[] = [];
  parent: AStarNode | undefined;
  f = 0; // total cost
  g = 0; // cost from start to current pos
  h = 0; // estimated cost from current post to target pos

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  public equals(other: AStarNode): boolean {
    return other.x === this.x && other.y === this.y;
  }
}

function heuristic(a: AStarNode, b: AStarNode) {
  return Math.abs(b.x - a.x) + Math.abs(b.y - a.y);
}

/**
 * @param current AStarNode: Starting node
 * @param target AStarNode: Target node
 * @returns AStarNode[]: The shortest found path
 * @throws Error if no path was found
 */
export function AStar(current: AStarNode, target: AStarNode): AStarNode[] {
  const openSet: AStarNode[] = [current];
  const closedSet: AStarNode[] = [];
  const path: AStarNode[] = [];

  while (openSet.length > 0) {
    // Find node with lowest f as current
    let lowestIndex = 0;
    for (let i = 0; i < openSet.length; i++) {
      if (openSet[i].f < openSet[lowestIndex].f) {
        lowestIndex = i;
      }
    }
    const current: AStarNode = openSet[lowestIndex];

    // Check if we made it to the end, if so -> create path
    if (current.equals(target)) {
      let temp = current;
      path.push(temp);
      while (temp.parent) {
        path.push(temp.parent);
        temp = temp.parent;
      }
      break;
    }

    // Administration
    openSet.splice(lowestIndex, 1);
    closedSet.push(current);

    // Check distance to neighbours
    current.neighBours.forEach((neighBour: AStarNode) => {
      if (closedSet.find((cs) => cs.equals(neighBour))) {
        return;
      }

      const possibleG = current.g + 1;
      if (!openSet.find((os) => os.equals(neighBour))) {
        openSet.push(neighBour);
      } else if (possibleG >= neighBour.g) {
        return;
      }

      neighBour.g = possibleG;
      neighBour.h = heuristic(neighBour, target);
      neighBour.f = neighBour.g + neighBour.h;
      neighBour.parent = current;
    });
  }

  return path;
}
