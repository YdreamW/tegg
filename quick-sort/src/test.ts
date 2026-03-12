import { quickSort } from './index';

function testBasicSorting(): void {
  console.log('=== 基础排序测试 ===');
  
  const testCases = [
    { input: [3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5], name: '随机数字数组' },
    { input: [5, 4, 3, 2, 1], name: '逆序数组' },
    { input: [1, 2, 3, 4, 5], name: '已排序数组' },
  ];

  for (const testCase of testCases) {
    const result = quickSort(testCase.input);
    const expected = [...testCase.input].sort((a, b) => a - b);
    const passed = JSON.stringify(result) === JSON.stringify(expected);
    
    console.log(`测试用例: ${testCase.name}`);
    console.log(`  输入: ${testCase.input}`);
    console.log(`  输出: ${result}`);
    console.log(`  预期: ${expected}`);
    console.log(`  结果: ${passed ? '✅ 通过' : '❌ 失败'}\n`);
  }
}

function testEdgeCases(): void {
  console.log('=== 边界情况测试 ===');
  
  const testCases = [
    { input: [], name: '空数组' },
    { input: [42], name: '单元素数组' },
    { input: [5, 5, 5, 5, 5], name: '所有元素相同的数组' },
    { input: [3, 1, 4, 1, 5, 5, 5, 9, 2, 6], name: '包含重复元素的数组' },
    { input: [10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0], name: '完全逆序的大数组' },
    { input: [2, 2, 1, 1, 3, 3, 4, 4, 5, 5], name: '交替重复元素' },
  ];

  for (const testCase of testCases) {
    const result = quickSort(testCase.input);
    const expected = [...testCase.input].sort((a, b) => a - b);
    const passed = JSON.stringify(result) === JSON.stringify(expected);
    
    console.log(`测试用例: ${testCase.name}`);
    console.log(`  输入: ${testCase.input}`);
    console.log(`  输出: ${result}`);
    console.log(`  预期: ${expected}`);
    console.log(`  结果: ${passed ? '✅ 通过' : '❌ 失败'}\n`);
  }
}

function testDifferentTypes(): void {
  console.log('=== 不同类型测试 ===');
  
  // 测试字符串数组
  const stringTestCase = { 
    input: ['banana', 'apple', 'cherry', 'date'], 
    name: '字符串数组',
    comparator: (a: string, b: string) => a.localeCompare(b)
  };
  
  const stringResult = quickSort(stringTestCase.input);
  const stringExpected = [...stringTestCase.input].sort(stringTestCase.comparator);
  const stringPassed = JSON.stringify(stringResult) === JSON.stringify(stringExpected);
  
  console.log(`测试用例: ${stringTestCase.name}`);
  console.log(`  输入: ${stringTestCase.input}`);
  console.log(`  输出: ${stringResult}`);
  console.log(`  预期: ${stringExpected}`);
  console.log(`  结果: ${stringPassed ? '✅ 通过' : '❌ 失败'}\n`);
  
  // 测试浮点数数组
  const floatTestCase = { 
    input: [3.14, 1.41, 2.71, 0.57], 
    name: '浮点数数组',
    comparator: (a: number, b: number) => a - b
  };
  
  const floatResult = quickSort(floatTestCase.input);
  const floatExpected = [...floatTestCase.input].sort(floatTestCase.comparator);
  const floatPassed = JSON.stringify(floatResult) === JSON.stringify(floatExpected);
  
  console.log(`测试用例: ${floatTestCase.name}`);
  console.log(`  输入: ${floatTestCase.input}`);
  console.log(`  输出: ${floatResult}`);
  console.log(`  预期: ${floatExpected}`);
  console.log(`  结果: ${floatPassed ? '✅ 通过' : '❌ 失败'}\n`);
}

function testPartition(): void {
  console.log('=== 分区函数测试 ===');
  
  const { partition } = require('./partition');
  const arr = [3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5];
  const copy = [...arr];
  
  console.log(`原始数组: ${arr}`);
  const pivotIndex = partition(copy, 0, arr.length - 1);
  console.log(`分区后: ${copy}`);
  console.log(`基准元素位置: ${pivotIndex}`);
  console.log(`基准元素: ${copy[pivotIndex]}\n`);
}

testBasicSorting();
testEdgeCases();
testDifferentTypes();
testPartition();
