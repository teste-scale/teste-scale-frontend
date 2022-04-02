export class ArrayHelper {
  public static CreateArrayFromNumber(number: number): Array<number> {
    return Array.from({ length: number }, (_, index) => index + 1);
  }
}
