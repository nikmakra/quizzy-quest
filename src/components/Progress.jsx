import { useQuiz } from "../contexts/QuizProvider";

function Progress() {
  const { index, numQuestions, points, maxPoints } = useQuiz();

  return (
    <div className="progress-wrapper">
      <progress value={index + 1} max={numQuestions}></progress>
      <div className="active-stats">
        <p>
          Question <span>{index + 1}</span>/{numQuestions}
        </p>
        <p>
          <span>{points}</span>/{maxPoints} points
        </p>
      </div>
    </div>
  );
}

export default Progress;
