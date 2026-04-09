import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User, Language, Course, Word, Achievement, Note, LessonProgress } from '../types';

interface AppState {
  user: User | null;
  isAuthenticated: boolean;
  languages: Language[];
  courses: Course[];
  currentLanguage: Language | null;
  currentCourse: Course | null;
  words: Word[];
  achievements: Achievement[];
  notes: Note[];
  lessonProgress: LessonProgress[];

  login: (username: string, password: string) => Promise<boolean>;
  register: (username: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  updateUser: (user: Partial<User>) => void;

  setLanguages: (languages: Language[]) => void;
  setCurrentLanguage: (language: Language) => void;

  setCourses: (courses: Course[]) => void;
  setCurrentCourse: (course: Course) => void;

  setWords: (words: Word[]) => void;
  setAchievements: (achievements: Achievement[]) => void;
  setNotes: (notes: Note[]) => void;
  addNote: (note: Note) => void;
  likeNote: (noteId: string) => void;

  updateLessonProgress: (progress: LessonProgress) => void;
  addXP: (amount: number) => void;
  unlockAchievement: (achievementId: string) => void;
}

const initialUser: User = {
  id: '1',
  username: '学习者',
  email: 'learner@example.com',
  avatar: '',
  level: 3,
  xp: 750,
  streak: 7,
  lastActive: new Date().toISOString(),
  createdAt: new Date().toISOString()
};

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      languages: [],
      courses: [],
      currentLanguage: null,
      currentCourse: null,
      words: [],
      achievements: [],
      notes: [],
      lessonProgress: [],

      login: async (username: string, password: string) => {
        await new Promise(resolve => setTimeout(resolve, 500));
        set({ user: { ...initialUser, username }, isAuthenticated: true });
        return true;
      },

      register: async (username: string, email: string, password: string) => {
        await new Promise(resolve => setTimeout(resolve, 500));
        set({
          user: { ...initialUser, username, email, xp: 0, level: 1, streak: 0 },
          isAuthenticated: true
        });
        return true;
      },

      logout: () => {
        set({ user: null, isAuthenticated: false });
      },

      updateUser: (userData) => {
        set((state) => ({
          user: state.user ? { ...state.user, ...userData } : null
        }));
      },

      setLanguages: (languages) => {
        set({ languages });
        if (!get().currentLanguage && languages.length > 0) {
          set({ currentLanguage: languages[0] });
        }
      },

      setCurrentLanguage: (language) => {
        set({ currentLanguage: language });
      },

      setCourses: (courses) => {
        set({ courses });
      },

      setCurrentCourse: (course) => {
        set({ currentCourse: course });
      },

      setWords: (words) => {
        set({ words });
      },

      setAchievements: (achievements) => {
        set({ achievements });
      },

      setNotes: (notes) => {
        set({ notes });
      },

      addNote: (note) => {
        set((state) => ({ notes: [note, ...state.notes] }));
      },

      likeNote: (noteId) => {
        set((state) => ({
          notes: state.notes.map(note =>
            note.id === noteId ? { ...note, likes: note.likes + 1 } : note
          )
        }));
      },

      updateLessonProgress: (progress) => {
        set((state) => {
          const existingIndex = state.lessonProgress.findIndex(
            p => p.courseId === progress.courseId && p.lessonId === progress.lessonId
          );
          const newProgress = [...state.lessonProgress];
          if (existingIndex >= 0) {
            newProgress[existingIndex] = progress;
          } else {
            newProgress.push(progress);
          }
          return { lessonProgress: newProgress };
        });
      },

      addXP: (amount) => {
        set((state) => {
          if (!state.user) return state;
          const newXP = state.user.xp + amount;
          const newLevel = Math.floor(newXP / 500) + 1;
          return {
            user: { ...state.user, xp: newXP, level: newLevel }
          };
        });
      },

      unlockAchievement: (achievementId) => {
        set((state) => ({
          achievements: state.achievements.map(ach =>
            ach.id === achievementId ? { ...ach, unlocked: true, unlockedAt: new Date().toISOString() } : ach
          )
        }));
      }
    }),
    {
      name: 'polyglot-storage',
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        lessonProgress: state.lessonProgress,
        achievements: state.achievements
      })
    }
  )
);
