import { useQuiz } from "../contexts/QuizProvider";

function Options() {
  const { question, dispatch, answer, hasAnswered } = useQuiz();

  return (
    <div className="options-wrapper">
      <h3>{question.question}</h3>
      <div className="options">
        {question.options.map((option, i) => (
          <button
            disabled={hasAnswered}
            className={`btn btn-option ${i === answer ? "answer" : ""} ${
              hasAnswered &&
              (i === question.correctOption ? "correct" : "wrong")
            }`}
            key={option}
            onClick={() => {
              dispatch({ type: "newAnswer", payload: i });
            }}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Options;
