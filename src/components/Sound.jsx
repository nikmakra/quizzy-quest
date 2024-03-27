import { useQuiz } from "../contexts/QuizProvider";

function Sound() {
  const { dispatch, soundOn } = useQuiz();

  return (
    <img
      onClick={() => dispatch({ type: "sound" })}
      className="sound"
      src={soundOn === true ? "sound-on.svg" : "sound-off.svg"}
    ></img>
  );
}

export default Sound;
