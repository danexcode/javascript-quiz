import { Container, Stack, Typography } from '@mui/material'
import './App.css'
import JavascriptLogo from './icons/jsLogo'
import Start from './components/Start'
import { useQuestionStore } from './store/question'
import Game from './components/Game'

function App() {
  const questions = useQuestionStore(state => state.questions)

  console.log(questions);

  return (
    <main>
      <Container>
        <Stack direction="row" gap={2} alignItems="center" justifyContent="center" mb={2}>
          <JavascriptLogo />
          <Typography variant='h2' component="h1">
            Javascript Quizz
          </Typography>
        </Stack>

        {questions.length === 0 && <Start />}
        {questions.length > 0 && <Game />}
      </Container>
    </main>
  )
}

export default App
