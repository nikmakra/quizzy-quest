export function StartScreen({ numQuestions, dispatch }) {
  return (
    <div className="start-screen">
      <h1>The Quizzy Quest</h1>
      <p className="welcome">Welcome to the Quizzy quest!</p>
      <p className="description">
        {numQuestions} questions to test your knowledge
      </p>
      <button
        onClick={() => dispatch({ type: "start" })}
        className="btn btn-ui"
      >
        Let&apos;s start
      </button>
    </div>
  );
}
