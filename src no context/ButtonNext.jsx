function ButtonNext({ index, numQuestions, hasAnswered, dispatch }) {
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
