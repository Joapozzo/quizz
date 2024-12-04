import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Question } from "../types/types";
import confetti from "canvas-confetti";

interface QuestionsState {
    questions: Question[];
    currentQuestion: number;
    loading: boolean;
    fetchQuestions: (limit: number) => Promise<void>;
    selectAnswer: (questionId: number, answerId: number) => void;
    goNextQuestions: () => void;
    goPreviousQuestions: () => void;
    reset: () => void;
}

const API_URL = import.meta.env.PROD ? 'https://quizz-gp.vercel.app/' : 'http://localhost:5173/';

export const useQuestionsStore = create(
    persist<QuestionsState>(
        (set, get) => ({
            loading: false,
            questions: [],
            currentQuestion: 0,

            fetchQuestions: async (limit: number) => {
                try {
                    set({ loading: true });
                    const res = await fetch(`${API_URL}/data.json`);
                    const data = await res.json();

                    const questions = data.sort(() => Math.random() - 0.5).slice(0, limit);
                    set({ questions, loading: false });
                } catch (error) {
                    console.error("Error fetching questions:", error);
                    set({ loading: false });
                }
            },

            selectAnswer: (questionId: number, answerId: number) => {
                const { questions } = get();
                const newQuestions = structuredClone(questions);
                const questionIndex = newQuestions.findIndex((q) => q.id === questionId);
                const questionInfo = newQuestions[questionIndex];

                const isCorrectUserAnswer = questionInfo.correctAnswer === answerId;
                if (isCorrectUserAnswer) confetti();

                newQuestions[questionIndex] = {
                    ...questionInfo,
                    isCorrectUserAnswer,
                    userSelectedAnswer: answerId,
                };

                set({ questions: newQuestions });
            },

            goNextQuestions: () => {
                const { currentQuestion, questions } = get();
                if (currentQuestion + 1 < questions.length) {
                    set({ currentQuestion: currentQuestion + 1 });
                }
            },

            goPreviousQuestions: () => {
                const { currentQuestion } = get();
                if (currentQuestion > 0) {
                    set({ currentQuestion: currentQuestion - 1 });
                }
            },

            reset: () => {
                set({
                    questions: [],
                    currentQuestion: 0,
                    loading: false,
                });
            },
        }),
        {
            name: "questions"
        }
    )
);
