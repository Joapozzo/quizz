import { Container, Stack, Typography } from '@mui/material'
import './App.css'
import World from './componentes/World'
import Start from './componentes/Start'
import Questions from './componentes/Questions'
import { useQuestionsStore } from './store/questions'
import Reset from './componentes/Reset'
import Finish from './componentes/Finish'
import { useQuestionsStats } from './hooks/useQuestionsStats'

function App() {
  const questions = useQuestionsStore((state) => state.questions)

  const { correct, incorrect } = useQuestionsStats();
  const finishGame = correct + incorrect === questions.length

  return (
    <main>
      <Container>
        <Stack spacing={1} direction='column'>
          <Stack spacing={2} direction='row' alignItems='center' justifyContent='center'>
            <World/>
            <Typography variant="h3" component='h1'>Quizz</Typography>
          </Stack>
          <Typography component='p' fontSize='25px'>Categoty: <span style={{color: '#42A5F5'}}>Geography</span></Typography>

          {questions.length === 0 && <Start text={'Start game'}/>}
          {!finishGame && questions.length > 0 && <Questions/>}
          {questions.length > 0 && finishGame && <Finish/>}
          {questions.length > 0 && finishGame && <Start text={'Play again'}/>}
          {questions.length > 0 && !finishGame && <Reset/>}

        </Stack>
      </Container>
    </main>
  )
}

export default App
