import type { Language, Course, Word, Achievement, Note } from '../types';

export const mockLanguages: Language[] = [
  {
    id: 'en',
    name: '英语',
    code: 'en',
    flag: '🇺🇸',
    color: '#3B82F6',
    description: '全球最广泛使用的语言',
    learners: 1250000
  },
  {
    id: 'ja',
    name: '日语',
    code: 'ja',
    flag: '🇯🇵',
    color: '#EF4444',
    description: '探索日本文化的钥匙',
    learners: 680000
  },
  {
    id: 'ko',
    name: '韩语',
    code: 'ko',
    flag: '🇰🇷',
    color: '#10B981',
    description: '感受韩流的魅力',
    learners: 450000
  }
];

export const mockCourses: Course[] = [
  {
    id: 'en-1',
    languageId: 'en',
    title: '英语入门 - 零基础到日常对话',
    description: '从零开始学习英语，掌握基础词汇和语法，能够进行简单的日常对话。',
    level: 'beginner',
    duration: '20小时',
    lessons: 48,
    rating: 4.8,
    students: 25000,
    thumbnail: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&h=300&fit=crop',
    progress: 35
  },
  {
    id: 'en-2',
    languageId: 'en',
    title: '商务英语进阶',
    description: '提升商务场景下的英语沟通能力，学习专业词汇和表达技巧。',
    level: 'intermediate',
    duration: '30小时',
    lessons: 60,
    rating: 4.9,
    students: 18000,
    thumbnail: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=300&fit=crop'
  },
  {
    id: 'ja-1',
    languageId: 'ja',
    title: '日语五十音图入门',
    description: '系统学习平假名和片假名，掌握日语发音基础。',
    level: 'beginner',
    duration: '10小时',
    lessons: 24,
    rating: 4.7,
    students: 32000,
    thumbnail: 'https://images.unsplash.com/photo-1528164344705-47542687000d?w=400&h=300&fit=crop',
    progress: 60
  },
  {
    id: 'ja-2',
    languageId: 'ja',
    title: '日语N2语法精讲',
    description: '深入学习N2级别语法，为日语能力考做好准备。',
    level: 'advanced',
    duration: '40小时',
    lessons: 80,
    rating: 4.9,
    students: 12000,
    thumbnail: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=400&h=300&fit=crop'
  },
  {
    id: 'ko-1',
    languageId: 'ko',
    title: '韩语发音与日常用语',
    description: '学习韩语发音规则，掌握常用日常表达。',
    level: 'beginner',
    duration: '15小时',
    lessons: 32,
    rating: 4.8,
    students: 21000,
    thumbnail: 'https://images.unsplash.com/photo-1538485399081-7191377e8241?w=400&h=300&fit=crop'
  },
  {
    id: 'ko-2',
    languageId: 'ko',
    title: '韩剧韩语学习',
    description: '通过热门韩剧学习地道韩语表达。',
    level: 'intermediate',
    duration: '25小时',
    lessons: 50,
    rating: 4.9,
    students: 15000,
    thumbnail: 'https://images.unsplash.com/photo-1614104298570-672301b63322?w=400&h=300&fit=crop'
  }
];

export const mockWords: Word[] = [
  {
    id: 'en-w1',
    languageId: 'en',
    word: 'Hello',
    translation: '你好',
    pronunciation: '/həˈloʊ/',
    example: 'Hello, how are you?',
    category: '问候',
    level: 1
  },
  {
    id: 'en-w2',
    languageId: 'en',
    word: 'Thank you',
    translation: '谢谢',
    pronunciation: '/θæŋk juː/',
    example: 'Thank you for your help.',
    category: '礼貌用语',
    level: 1
  },
  {
    id: 'en-w3',
    languageId: 'en',
    word: 'Goodbye',
    translation: '再见',
    pronunciation: '/ɡʊdˈbaɪ/',
    example: 'Goodbye, see you tomorrow.',
    category: '问候',
    level: 1
  },
  {
    id: 'en-w4',
    languageId: 'en',
    word: 'Please',
    translation: '请',
    pronunciation: '/pliːz/',
    example: 'Could you help me, please?',
    category: '礼貌用语',
    level: 1
  },
  {
    id: 'en-w5',
    languageId: 'en',
    word: 'Sorry',
    translation: '对不起',
    pronunciation: '/ˈsɔːri/',
    example: 'I\'m sorry for being late.',
    category: '礼貌用语',
    level: 1
  },
  {
    id: 'en-w6',
    languageId: 'en',
    word: 'Yes',
    translation: '是',
    pronunciation: '/jes/',
    example: 'Yes, I understand.',
    category: '基础词汇',
    level: 1
  },
  {
    id: 'en-w7',
    languageId: 'en',
    word: 'No',
    translation: '不',
    pronunciation: '/noʊ/',
    example: 'No, thank you.',
    category: '基础词汇',
    level: 1
  },
  {
    id: 'en-w8',
    languageId: 'en',
    word: 'Love',
    translation: '爱',
    pronunciation: '/lʌv/',
    example: 'I love learning languages.',
    category: '情感',
    level: 1
  }
];

export const mockAchievements: Achievement[] = [
  {
    id: 'ach-1',
    title: '学习起步',
    description: '完成第一节课',
    icon: '🎯',
    xpReward: 50,
    unlocked: true,
    unlockedAt: new Date().toISOString()
  },
  {
    id: 'ach-2',
    title: '词汇达人',
    description: '学习100个单词',
    icon: '📚',
    xpReward: 100,
    unlocked: true,
    unlockedAt: new Date().toISOString()
  },
  {
    id: 'ach-3',
    title: '坚持一周',
    description: '连续学习7天',
    icon: '🔥',
    xpReward: 150,
    unlocked: true,
    unlockedAt: new Date().toISOString()
  },
  {
    id: 'ach-4',
    title: '课程完成者',
    description: '完成一门课程',
    icon: '🏆',
    xpReward: 200,
    unlocked: false
  },
  {
    id: 'ach-5',
    title: '社区新星',
    description: '发布第一条笔记',
    icon: '⭐',
    xpReward: 75,
    unlocked: false
  },
  {
    id: 'ach-6',
    title: '听力大师',
    description: '完成50个听力练习',
    icon: '🎧',
    xpReward: 180,
    unlocked: false
  }
];

export const mockNotes: Note[] = [
  {
    id: 'note-1',
    userId: 'user-1',
    username: '语言爱好者',
    languageId: 'en',
    content: '今天学习了英语的现在完成时，感觉这个时态确实很实用！分享一下我的理解：have/has + 过去分词，用来表示过去发生的动作对现在的影响。',
    likes: 42,
    comments: 8,
    createdAt: new Date(Date.now() - 3600000).toISOString()
  },
  {
    id: 'note-2',
    userId: 'user-2',
    username: '日语小白',
    languageId: 'ja',
    content: '终于搞清楚は和が的区别了！は强调后面的内容，が强调前面的主语。分享给大家一起学习～',
    likes: 89,
    comments: 15,
    createdAt: new Date(Date.now() - 7200000).toISOString()
  },
  {
    id: 'note-3',
    userId: 'user-3',
    username: '韩流粉丝',
    languageId: 'ko',
    content: '通过看韩剧学韩语真的很有效！推荐《请回答1988》，台词很生活化，适合初学者。',
    likes: 156,
    comments: 23,
    createdAt: new Date(Date.now() - 10800000).toISOString()
  }
];
