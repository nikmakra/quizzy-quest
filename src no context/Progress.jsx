function Progress({ index, numQuestions, points, maxPoints }) {
  return (
    <div>
      <progress value={index + 1} max={numQuestions}></progress>
      <div className="active-stats">
        <p>
          Question {index + 1}/{numQuestions}
        </p>
        <p>
          {points}/{maxPoints} points
        </p>
      </div>
    </div>
  );
}

export default Progress;
