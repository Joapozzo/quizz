export interface Question {
    id: number
    question: string
    image: string
    options: string[]
    correctAnswer: number
    userSelectedAnswer: number
    isCorrectUserAnswer: boolean
}