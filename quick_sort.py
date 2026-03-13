def quick_sort(arr):
    if len(arr) <= 1:
        return arr
    quick_sort_helper(arr, 0, len(arr) - 1)
    return arr

def partition(arr, low, high):
    pivot = arr[high]
    i = low - 1
    for j in range(low, high):
        if arr[j] <= pivot:
            i += 1
            arr[i], arr[j] = arr[j], arr[i]
    arr[i + 1], arr[high] = arr[high], arr[i + 1]
    return i + 1

def quick_sort_helper(arr, low, high):
    if low < high:
        pi = partition(arr, low, high)
        quick_sort_helper(arr, low, pi - 1)
        quick_sort_helper(arr, pi + 1, high)

if __name__ == "__main__":
    test_arrays = [
        [64, 34, 25, 12, 22, 11, 90],
        [5, 2, 8, 1, 9, 3],
        [1],
        [],
        [3, 3, 3, 3],
        [9, 8, 7, 6, 5, 4, 3, 2, 1],
    ]
    
    for i, arr in enumerate(test_arrays):
        original = arr.copy()
        sorted_arr = quick_sort(arr)
        print(f"测试 {i + 1}: {original} -> {sorted_arr}")
        assert sorted_arr == sorted(original), f"排序错误: {original}"
    
    print("\n所有测试通过！")
