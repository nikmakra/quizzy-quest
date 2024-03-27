import { useQuiz } from "../contexts/QuizProvider";

function Logo() {
  const { questions, dispatch } = useQuiz();

  return (
    <h1
      className="logo"
      onClick={() => dispatch({ type: "dataReceived", payload: questions })}
    >
      The Quizzy Quest
    </h1>
  );
}

export default Logo;
