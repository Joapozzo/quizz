import { Button } from '@mui/material'
import { useQuestionsStore } from '../store/questions'

const Start = ({text}: {text:string}) => {
    const LIMIT_QUESTIONS = 10
    const fetchQuestions = useQuestionsStore((state) => state.fetchQuestions)
    const reset = useQuestionsStore((state) => state.reset)
    const handlePlayToGame = () => {
        reset()
        fetchQuestions(LIMIT_QUESTIONS)
    }

    return (
        <Button variant='contained' color='primary' size='large' onClick={handlePlayToGame}>
            {text}
        </Button>
    )
}

export default Start