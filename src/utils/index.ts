export class Utils {
  public static getRandomElementFromArray(arr: any[]): any {
    return arr[Math.floor(Math.random() * arr.length)];
  };

  /**
   * Splits a list into several lists of size chunkSize
   * @param list list to split
   * @param chunkSize the size of lists to split into
   * @returns array of arrays of size chunkSize
   */
  public static chunkArray<E extends unknown>(list: E[], chunkSize: number): E[][] {
    return [...Array(Math.ceil(list.length / chunkSize))].map((_, i) => list.slice(i*chunkSize,i*chunkSize+chunkSize));
  }

  public static shuffleArray(array: any[]) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

}
