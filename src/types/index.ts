export interface User {
  id: string;
  username: string;
  email: string;
  avatar?: string;
  level: number;
  xp: number;
  streak: number;
  lastActive: string;
  createdAt: string;
}

export interface Language {
  id: string;
  name: string;
  code: string;
  flag: string;
  color: string;
  description: string;
  learners: number;
}

export interface Course {
  id: string;
  languageId: string;
  title: string;
  description: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  duration: string;
  lessons: number;
  rating: number;
  students: number;
  thumbnail: string;
  progress?: number;
}

export interface Word {
  id: string;
  languageId: string;
  word: string;
  translation: string;
  pronunciation: string;
  example: string;
  category: string;
  level: number;
}

export interface GrammarLesson {
  id: string;
  languageId: string;
  title: string;
  content: string;
  examples: string[];
  exercises: GrammarExercise[];
  level: number;
}

export interface GrammarExercise {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
}

export interface ListeningExercise {
  id: string;
  languageId: string;
  audioUrl: string;
  question: string;
  options: string[];
  correctAnswer: number;
  transcript: string;
  level: number;
}

export interface SpeakingExercise {
  id: string;
  languageId: string;
  prompt: string;
  targetPhrase: string;
  level: number;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  xpReward: number;
  unlocked: boolean;
  unlockedAt?: string;
}

export interface Note {
  id: string;
  userId: string;
  username: string;
  languageId: string;
  content: string;
  likes: number;
  comments: number;
  createdAt: string;
}

export interface LessonProgress {
  courseId: string;
  lessonId: string;
  completed: boolean;
  score?: number;
  completedAt?: string;
}

export interface DailyGoal {
  xp: number;
  completed: boolean;
  date: string;
}
