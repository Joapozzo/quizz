import { Check, Close, QuestionMark } from '@mui/icons-material'
import { Stack } from '@mui/material'
import { useQuestionsStats } from '../hooks/useQuestionsStats'

const Stats = () => {
  const { correct, incorrect, notAnswered } = useQuestionsStats()

  return (
    <Stack direction={'row'} alignItems={'center'} justifyContent={'center'} gap={2}>
        <Stack alignItems={'start'} justifyContent={'start'} direction={'row'} gap={0.5} color={'green'}> <Check/> Correct <span>{correct}</span></Stack>
        <Stack alignItems={'start'} justifyContent={'start'} direction={'row'} gap={0.5} color={'red'}> <Close/> Incorrect <span>{incorrect}</span></Stack>
        <Stack alignItems={'start'} justifyContent={'start'} direction={'row'} gap={0.5} color={'gray'}> <QuestionMark/> Not Answered <span>{notAnswered}</span></Stack>
    </Stack>
  )
}

export default Stats