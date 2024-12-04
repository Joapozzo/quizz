import { Stack, Typography } from '@mui/material'
import { useQuestionsStore } from '../store/questions'
import { useQuestionsStats } from '../hooks/useQuestionsStats';

const Finish = () => {
    const questions = useQuestionsStore((state) => state.questions);
    const { correct } = useQuestionsStats();

    const percentage = ((correct / questions.length) * 100).toFixed(2);
    let text = '';
    if (+percentage >= 60) {
        text = 'Congratulations!';
    } else if (+percentage <= 50) {
        text = 'Oops, can play again!';
    }

    return (
        <Stack gap={2} direction="column">
            <Typography variant="h3" component="h1">{text}</Typography>
            <Typography variant="h5" component="h2">
                Finish to game with {percentage}% of correct answers
            </Typography>
        </Stack>
    );
};

export default Finish;
