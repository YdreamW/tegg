export class QuickSort {
  static sort(arr: number[], low = 0, high = arr.length - 1): void {
    if (low < high) {
      const pivotIndex = this.partition(arr, low, high);
      this.sort(arr, low, pivotIndex - 1);
      this.sort(arr, pivotIndex + 1, high);
    }
  }

  private static partition(arr: number[], low: number, high: number): number {
    const pivot = arr[high];
    let i = low - 1;

    for (let j = low; j < high; j++) {
      if (arr[j] <= pivot) {
        i++;
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
    }

    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    return i + 1;
  }

  static sortWithComparator<T>(arr: T[], comparator: (a: T, b: T) => number, low = 0, high = arr.length - 1): void {
    if (low < high) {
      const pivotIndex = this.partitionWithComparator(arr, comparator, low, high);
      this.sortWithComparator(arr, comparator, low, pivotIndex - 1);
      this.sortWithComparator(arr, comparator, pivotIndex + 1, high);
    }
  }

  private static partitionWithComparator<T>(arr: T[], comparator: (a: T, b: T) => number, low: number, high: number): number {
    const pivot = arr[high];
    let i = low - 1;

    for (let j = low; j < high; j++) {
      if (comparator(arr[j], pivot) <= 0) {
        i++;
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
    }

    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    return i + 1;
  }
}
