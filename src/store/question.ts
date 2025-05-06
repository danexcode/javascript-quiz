import { create } from 'zustand';
import type { Question } from '../types';
import confetti from 'canvas-confetti';
import { persist, devtools } from 'zustand/middleware';
import { getAllQuestions } from '../services/questions';

interface State {
  questions: Question[];
  currentQuestion: number;
  fetchQuestions: (limit: number) => Promise<void>;
  selectAnswer: (questionId: number, aswerIndex: number) => void,
  goNextQuestion: () => void,
  goPreviousQuestion: () => void,
  reset: () => void,
}

/* const logger = (config) => (set, get, api) => {
  return config(
    (...args) => {
      console.log('appliying..', args);
      set(...args)
    },
    get,
    api,
  )
} */

export const useQuestionStore = create<State>()(
  devtools(
    persist(
      (set, get) => ({
        questions: [],
        currentQuestion: 0,

        // Actualizar el estado de questions con la data fetcheada
        fetchQuestions: async (limit: number) => {
          const allQuestions = await getAllQuestions()
          
          const questions = allQuestions.sort(() => Math.random() - 0.5).slice(0, limit);
          set({ questions }, false, 'fetchQuestions');
        },

        // Seleccionar una respuesta
        selectAnswer: (questionId: number, answerIndex: number) => {
          const { questions } = get();

          // Usar el structureClone, sirve para clonar objetos de forma profunda
          const newQuestions = structuredClone(questions);
          // Encontramos el indice de la pregunta
          const questionIndex = newQuestions.findIndex(q => q.id === questionId);
          // Obtenemos la informacion de la pregunta
          const questionInfo = newQuestions[questionIndex];
          // Averiguamos si el usuario a seleccionado la respuesta correcta
          const isCorrectUserAnswer = questionInfo.correctAnswer === answerIndex;
          // Cambiar esta informacion en la copia de la pregunta
          newQuestions[questionIndex] = {
            ...questionInfo,
            isCorrectUserAnswer,
            userSelectedAnswer: answerIndex,
          };
          // Actualizar el estado
          if (isCorrectUserAnswer) confetti();
          set({ questions: newQuestions }, false, 'selectAnswer');
        },

        goNextQuestion: () => {
          const { currentQuestion, questions } = get();
          const nextQuestion = currentQuestion + 1;

          if (nextQuestion < questions.length) {
            set({ currentQuestion: nextQuestion }, false, { type: 'update', payload: { currentQuestion: nextQuestion } })
          }
        },

        goPreviousQuestion: () => {
          const { currentQuestion } = get();
          const nextQuestion = currentQuestion - 1;

          if (nextQuestion >= 0) {
            set({ currentQuestion: nextQuestion }, false, 'goPreviousQuestion')
          }
        },

        reset: () => {
          set({ currentQuestion: 0, questions: [] }, false, 'reset')
        }
      }),
      {
        name: 'questions',
      }
    )
  ),
);
