import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { QuestionType } from '../types/question';

type QuestionStore = {
  questions: QuestionType[];
  addQuestion: (question: QuestionType) => void;
  toggleFavorite: (id: string) => void;
  removeQuestion: (id: string) => void;
};

export const useQuestionStore = create<QuestionStore>()(
  persist(
    (set) => ({
      questions: [],

      addQuestion: (question) => set((state) => ({ questions: [...state.questions, question] })),

      toggleFavorite: (id) => {
        set((state) => ({
          questions: state.questions.map((q) => (q.id === id ? { ...q, fav: !q.fav } : q)),
        }));
      },

      removeQuestion: (id) => {
        set((state) => ({
          questions: state.questions.filter((q) => q.id !== id),
        }));
      },
    }),
    {
      name: 'questions-storage',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
