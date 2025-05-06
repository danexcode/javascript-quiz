import { Button } from "@mui/material";
import { useQuestionStore } from "../store/question";

const LIMIT_QUESTIONS = 10

export default function Start() {
  const fetchQuestions = useQuestionStore(state => state.fetchQuestions);

  const handleClick = () => {
    fetchQuestions(LIMIT_QUESTIONS)
  }

  return (
    <Button 
      variant="contained"
      onClick={handleClick}
    >
      ¡Empezar!
    </Button>
  )
}