import { create } from "zustand";
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

const API_URL = "http://localhost:5173";

export const useQuestionsStore = create<QuestionsState>((set, get) => ({
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
        // Recupermos las preguntas del estado
        const { questions } = get();
        // Clonamos las preguntas para no modificar el estado
        const newQuestions = structuredClone(questions);
        // Obtenemos el incide de la pregunta seleccionada
        const questionIndex = newQuestions.findIndex((question) => question.id === questionId);
        // Obtenemos las respuestas de la pregunta seleccionada
        const questionInfo = newQuestions[questionIndex]
        // Verificamos si la respuesta es correcta
        const isCorrectUserAnswer = questionInfo.correctAnswer === answerId;

        if (isCorrectUserAnswer) confetti();

        newQuestions[questionIndex] = {
            ...questionInfo,
            isCorrectUserAnswer,
            userSelectedAnswer: answerId,
        }

        set({ questions: newQuestions })
    },

    goNextQuestions: () => {
        const { questions, currentQuestion } = get();
        const nextQuestion = currentQuestion + 1;
        if (nextQuestion < questions.length) {
            set({ currentQuestion: nextQuestion });
        }
    },

    goPreviousQuestions: () => {
        const { currentQuestion } = get();
        const previosQuestion = currentQuestion - 1;
        if (previosQuestion >= 0) {
            set({ currentQuestion: previosQuestion });
        }
    },

    reset: () => {
        set({
            questions: [],
            currentQuestion: 0,
            loading: false,
        });
    },
}));
