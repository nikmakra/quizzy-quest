import { useQuiz } from "../contexts/QuizProvider";

function FinishScreen() {
  const { points, maxPoints, dispatch, highscore } = useQuiz();

  const percentage = Math.ceil((points / maxPoints) * 100);

  function getEmoji() {
    if (percentage > 89) return "🥇";
    if (percentage > 75 && percentage < 89) return "🙂";
    if (percentage > 50 && percentage < 75) return "🤔";
    if (percentage < 50) return "⛔";
  }

  return (
    <div className="finish-screen">
      <p className="stats">
        <span>{getEmoji()}</span> You scored {points} out of {maxPoints} (
        {percentage}%) <span>{getEmoji()}</span>
      </p>
      <p>Highscore: {highscore}</p>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "restart" })}
      >
        Start again
      </button>
    </div>
  );
}

export default FinishScreen;
