export function replaceAt(
  input: string,
  searchValue: string,
  replaceValue: string,
  position: number,
) {
  return input.substring(0, position) + replaceValue +
    input.substring(position + searchValue.length);
}
