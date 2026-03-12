import { quickSort } from './index';

console.log('========================================');
console.log('      快速排序算法使用示例');
console.log('========================================\n');

// 示例 1: 排序数字数组
console.log('示例 1: 排序数字数组');
const numbers = [64, 34, 25, 12, 22, 11, 90];
console.log(`原始数组: [${numbers}]`);
const sortedNumbers = quickSort(numbers);
console.log(`排序后:   [${sortedNumbers}]\n`);

// 示例 2: 排序字符串数组
console.log('示例 2: 排序字符串数组');
const fruits = ['orange', 'apple', 'banana', 'grape', 'mango'];
console.log(`原始数组: [${fruits}]`);
const sortedFruits = quickSort(fruits);
console.log(`排序后:   [${sortedFruits}]\n`);

// 示例 3: 排序浮点数数组
console.log('示例 3: 排序浮点数数组');
const prices = [19.99, 5.99, 99.99, 3.50, 29.95];
console.log(`原始数组: [${prices}]`);
const sortedPrices = quickSort(prices);
console.log(`排序后:   [${sortedPrices}]\n`);

// 示例 4: 实际应用场景 - 学生成绩排序
console.log('示例 4: 实际应用 - 学生成绩排序');
interface Student {
  name: string;
  score: number;
}

const students: Student[] = [
  { name: 'Alice', score: 85 },
  { name: 'Bob', score: 92 },
  { name: 'Charlie', score: 78 },
  { name: 'Diana', score: 95 },
  { name: 'Eve', score: 88 }
];

console.log('学生列表:');
students.forEach(s => console.log(`  ${s.name}: ${s.score}`));

// 按成绩排序
const sortedScores = students.map(s => s.score);
const sortedStudentScores = quickSort(sortedScores);
console.log(`\n按成绩排序: [${sortedStudentScores}]`);

// 找到最高分和最低分
console.log(`最低分: ${sortedStudentScores[0]}`);
console.log(`最高分: ${sortedStudentScores[sortedStudentScores.length - 1]}\n`);

// 示例 5: 性能对比演示
console.log('示例 5: 性能对比演示');
console.log('生成随机数组...');
const largeArray = Array.from({ length: 10000 }, () => Math.floor(Math.random() * 100000));

console.log(`数组长度: ${largeArray.length}`);
console.log('使用快速排序...');
const quickSortStart = Date.now();
quickSort(largeArray);
const quickSortTime = Date.now() - quickSortStart;
console.log(`快速排序耗时: ${quickSortTime}ms`);

console.log('使用原生 sort...');
const nativeSortStart = Date.now();
[...largeArray].sort((a, b) => a - b);
const nativeSortTime = Date.now() - nativeSortStart;
console.log(`原生 sort 耗时: ${nativeSortTime}ms`);
console.log(`快速排序比原生 sort 快: ${nativeSortTime - quickSortTime}ms\n`);

// 示例 6: 不可变性演示
console.log('示例 6: 不可变性演示');
const original = [5, 2, 8, 1, 9];
const sorted = quickSort(original);
console.log(`原始数组: [${original}]`);
console.log(`排序数组: [${sorted}]`);
console.log(`原始数组是否被修改: ${original.toString() === sorted.toString() ? '是' : '否'}`);
console.log(`原始数组保持原样，实现了不可变性！\n`);

console.log('========================================');
console.log('      所有示例执行完毕！');
console.log('========================================');
