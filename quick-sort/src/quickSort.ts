import { partition } from './partition';

export function quickSort<T>(arr: T[]): T[] {
  const sorted = [...arr];
  sort(sorted, 0, sorted.length - 1);
  return sorted;
}

function sort<T>(arr: T[], low: number, high: number): void {
  if (low < high) {
    const pivotIndex = partition(arr, low, high);
    sort(arr, low, pivotIndex - 1);
    sort(arr, pivotIndex + 1, high);
  }
}
