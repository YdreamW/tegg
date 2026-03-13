import { QuickSort } from '..';
import assert from 'assert';

describe('test/QuickSort.test.ts', () => {
  it('should sort array in ascending order', () => {
    const arr = [64, 34, 25, 12, 22, 11, 90];
    QuickSort.sort(arr);
    assert.deepStrictEqual(arr, [11, 12, 22, 25, 34, 64, 90]);
  });

  it('should handle empty array', () => {
    const arr: number[] = [];
    QuickSort.sort(arr);
    assert.deepStrictEqual(arr, []);
  });

  it('should handle single element array', () => {
    const arr = [42];
    QuickSort.sort(arr);
    assert.deepStrictEqual(arr, [42]);
  });

  it('should handle already sorted array', () => {
    const arr = [1, 2, 3, 4, 5];
    QuickSort.sort(arr);
    assert.deepStrictEqual(arr, [1, 2, 3, 4, 5]);
  });

  it('should handle reverse sorted array', () => {
    const arr = [5, 4, 3, 2, 1];
    QuickSort.sort(arr);
    assert.deepStrictEqual(arr, [1, 2, 3, 4, 5]);
  });

  it('should handle array with duplicates', () => {
    const arr = [3, 1, 4, 1, 5, 9, 2, 6, 5, 3];
    QuickSort.sort(arr);
    assert.deepStrictEqual(arr, [1, 1, 2, 3, 3, 4, 5, 5, 6, 9]);
  });

  it('should sort with comparator in descending order', () => {
    const arr = [64, 34, 25, 12, 22, 11, 90];
    QuickSort.sortWithComparator(arr, (a, b) => b - a);
    assert.deepStrictEqual(arr, [90, 64, 34, 25, 22, 12, 11]);
  });

  it('should sort with comparator for objects', () => {
    interface Person {
      name: string;
      age: number;
    }
    const arr: Person[] = [
      { name: 'Alice', age: 30 },
      { name: 'Bob', age: 25 },
      { name: 'Charlie', age: 35 },
    ];
    QuickSort.sortWithComparator(arr, (a, b) => a.age - b.age);
    assert.deepStrictEqual(arr, [
      { name: 'Bob', age: 25 },
      { name: 'Alice', age: 30 },
      { name: 'Charlie', age: 35 },
    ]);
  });
});
