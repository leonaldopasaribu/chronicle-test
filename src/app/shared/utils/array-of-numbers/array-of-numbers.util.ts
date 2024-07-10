export class ArrayOfNumbersUtil {
  static getArrayOfNumbers(number: number): number[] {
    return Array(number)
      .fill(0)
      .map((x: number, index: number) => index);
  }
}
