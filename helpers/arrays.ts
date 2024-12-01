export function toTransposed<T>(grid: T[][]) {
  return grid.reduce(
    (result, row) =>
      row.map((
        cellValue,
        colIndex,
      ) => [...(result[colIndex] || []), cellValue]),
    [] as T[][],
  );
}

export function toTransposedStringArray(rows: string[]) {
  const grid = rows.map((r) => r.split(""));
  const transposedGrid = toTransposed(grid);
  return transposedGrid.map((r) => r.join(""));
}

export function zip<T>(arrayA: T[], arrayB: T[]) {
  const zips: [T, T][] = [];

  for (let i = 0; i < Math.min(arrayA.length, arrayB.length); i++) {
    zips.push([arrayA[i], arrayB[i]]);
  }

  return zips;
}
