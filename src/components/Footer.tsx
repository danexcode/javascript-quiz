import { Button } from "@mui/material";
import useQuestionData from "../hooks/useQuestionData"
import { useQuestionStore } from "../store/question";

export default function Footer() {
  const { correct, incorrect, unanswered } = useQuestionData();

  const reset = useQuestionStore(state => state.reset)

  return (
    <footer style={{ marginTop: '16px'}}>
      <strong>{`✅ ${correct} correctas - ❌${incorrect} incorrectas - ❔${unanswered} sin responder`}</strong>
      <div style={{ marginTop: '16px'}}>
        <Button onClick={() => reset()}>
          Resetear Juego
        </Button>
      </div>
    </footer>
  )
}