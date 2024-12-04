import { Card, CardMedia, List, ListItem, ListItemButton, ListItemText, Typography } from '@mui/material'
import { Question as QuestionType } from '../types/types'
import { useQuestionsStore } from '../store/questions'
import { getBackgroundColor } from '../helper'

const Question = ({ data }: { data: QuestionType }) => {
    const selectAnswer = useQuestionsStore((state) => state.selectAnswer)

    const createHandleClick = (index: number) => () => {
        selectAnswer(data.id, index)
    }
    
    return (
        <Card>
            <Typography component="h5" padding={2}>{data?.question}</Typography>
            <CardMedia component="img" image={data?.image} alt="Question" width={300} height={200} />
            <List sx={{ backgroundColor: '#333' }} disablePadding>
                {
                    data?.options.map((option, index) => (
                        <ListItem key={index} sx={{ backgroundColor: '#333' }} disablePadding divider>
                            <ListItemButton
                                disabled={data.userSelectedAnswer != null}
                                onClick={createHandleClick(index)}
                                sx={{ backgroundColor: getBackgroundColor(data, index) }}
                            >
                                <ListItemText primary={option} sx={{ textAlign: 'center' }} />
                            </ListItemButton>
                        </ListItem>
                    ))
                }
            </List>
        </Card>
    )
}

export default Question