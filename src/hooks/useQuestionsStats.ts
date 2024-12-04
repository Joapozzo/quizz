import { useQuestionsStore } from "../store/questions"

export const useQuestionsStats = () => {
    const questions = useQuestionsStore((state) => state.questions)
    
    let correct = 0
    let incorrect = 0
    let notAnswered = 0

    questions.forEach((question) => {
        if (question.userSelectedAnswer == null) notAnswered++
        if (question.isCorrectUserAnswer) correct++
        if (question.isCorrectUserAnswer === false) incorrect++
    })

    return {
        correct,
        incorrect,
        notAnswered,
    }
}