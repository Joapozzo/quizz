import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material"
import { IconButton, Stack } from "@mui/material"
import { useQuestionsStore } from "../store/questions"
import Question from "./Question"
import Stats from "./Stats"

const Questions = () => {
    const goPreviousQuestions = useQuestionsStore((state) => state.goPreviousQuestions)
    const goNextQuestions = useQuestionsStore((state) => state.goNextQuestions)
    const questions = useQuestionsStore((state) => state.questions)
    const currentQuestion = useQuestionsStore((state) => state.currentQuestion)

    const questionInfo = questions[currentQuestion]
  return (
    <>
        <Stack gap={2} direction='row' alignItems='center' justifyContent='center' textAlign={'center'}>
            <IconButton onClick={goPreviousQuestions} disabled={currentQuestion === 0}>
                <ArrowBackIos />
            </IconButton>
                {currentQuestion + 1} / {questions.length}
            <IconButton onClick={goNextQuestions} disabled={currentQuestion === questions.length - 1}>
                <ArrowForwardIos />
            </IconButton>
            
        </Stack>
        <Stats/>
        <Question data={questionInfo}/>
    </>
  )
}

export default Questions