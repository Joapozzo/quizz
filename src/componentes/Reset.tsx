import { Button } from '@mui/material'
import { useQuestionsStore } from '../store/questions'

const Reset = () => {
    const resetGame = useQuestionsStore((state) => state.reset)
  return (
    <Button variant='contained' color='primary' size='large' onClick={resetGame}>
        Reset
    </Button>
  )
}

export default Reset