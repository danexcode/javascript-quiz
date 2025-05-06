import { Card, IconButton, List, ListItem, ListItemButton, ListItemText, Stack, Typography } from "@mui/material";
import { useQuestionStore } from "../store/question";
import type { Question as QuestionType} from "../types";
import SyntaxHighlighter from 'react-syntax-highlighter'
import { gradientDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { ArrowBackIosNew, ArrowForwardIos } from "@mui/icons-material";
import Footer from "./Footer";

const getBackgroundColor = (info: QuestionType, index: number) => {
  const { userSelectedAnswer, correctAnswer } = info;
  // Usuario no ha seleccionado nada todavia
  if (userSelectedAnswer == null) return 'transparent';
  // Si ya seleccionó pero la solución es incorrecta
  if (index !== correctAnswer && index !== userSelectedAnswer) return 'transparent';
  // Si seleccionó la solución correcta
  if (index === correctAnswer) return 'green';
  // Si esta es la seleccion del usuario pero no es correcta
  if (index === userSelectedAnswer) return 'red';
  // Si no es ninguna de las anteriores
  return 'transparent';
}

const Question = ({ info }: { info: QuestionType}) => {
  const selecteAnswer = useQuestionStore(state => state.selectAnswer);

  const createHandleClick = (answerIndex: number) => {
    return () => {
      selecteAnswer(info.id, answerIndex);
    }
  };

  return (
    <Card variant="outlined" sx={{ bgcolor: '#222', p: 2, textAlign: 'left'}}>
      <Typography variant="h5">
        {info.question}
      </Typography>

      <SyntaxHighlighter 
        language="Javascript" 
        style={gradientDark}
      >
        {info.code}
      </SyntaxHighlighter>

      <List sx={{ bgcolor: '#333' }} disablePadding>
        {info.answers.map((anwser, index) => (
          <ListItem key={index} disablePadding divider>
            <ListItemButton 
              disabled={info.userSelectedAnswer != null}
              onClick={createHandleClick(index)}
              sx={{
                backgroundColor: getBackgroundColor(info, index)
              }}
            >
              <ListItemText primary={anwser} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Card>
  )
}

export default function Game() {
  const questions = useQuestionStore(state => state.questions);
  const currentQuestion = useQuestionStore(state => state.currentQuestion);
  const goNextQuestion = useQuestionStore(state => state.goNextQuestion)
  const goPreviousQuestion = useQuestionStore(state => state.goPreviousQuestion)

  const questionInfo = questions[currentQuestion];

  return (
    <>
      <Stack direction="row" gap={2} alignItems="center" justifyContent="center">
        <IconButton onClick={goPreviousQuestion} disabled={currentQuestion === 0}>
          <ArrowBackIosNew />
        </IconButton>

        {currentQuestion + 1} / {questions.length}

        <IconButton onClick={goNextQuestion} disabled={currentQuestion >= questions.length - 1}>
          <ArrowForwardIos />
        </IconButton>
      </Stack>
      <Question info={questionInfo} />
      <Footer />
    </>
  );
}