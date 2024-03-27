import { useQuiz } from "../contexts/QuizProvider";

function ButtonNext() {
  const { index, numQuestions, hasAnswered, dispatch } = useQuiz();

  const nextQuestion = index + 1 < numQuestions;

  function handleNext() {
    dispatch({ type: "nextQuestion" });
  }

  function handleFinish() {
    dispatch({ type: "finished" });
  }

  return (
    <>
      {hasAnswered && (
        <button
          className="btn btn-next"
          onClick={nextQuestion ? handleNext : handleFinish}
        >
          {nextQuestion ? "Next" : "Finish"}
        </button>
      )}
    </>
  );
}

export default ButtonNext;
