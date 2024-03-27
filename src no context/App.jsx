import { useReducer } from "react";
import { useEffect } from "react";
import { StartScreen } from "./StartScreen";
import ActiveScreen from "./ActiveScreen";
import Options from "./Options";
import Progress from "./Progress";
import FinishScreen from "./FinishScreen";
import Timer from "./Timer";
import Loader from "./Loader";
import Footer from "./Footer";
import Error from "./Error";
import Logo from "./Logo";
import clickWrong from "../public/click-wrong.wav";
import clickSuccess from "../public/click-success.wav";
import Sound from "./Sound";
import ButtonNext from "./ButtonNext";

const initialState = {
  questions: [],
  // loading, error, ready, active, finish
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  secondsRemaining: null,
  soundOn: false,
  highscore: 0,
};

const SECS_PER_QUESTION = 10;

function reducer(state, action) {
  switch (action.type) {
    case "dataFailed":
      return { ...state, status: "error" };
    case "dataReceived":
      return {
        ...state,
        status: "ready",
        questions: action.payload,
        points: 0,
        answer: null,
        index: 0,
      };
    case "start":
      return {
        ...state,
        status: "active",
        secondsRemaining: state.questions.length * SECS_PER_QUESTION,
      };
    case "newAnswer":
      const question = state.questions.at(state.index);

      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };
    case "nextQuestion":
      return { ...state, answer: null, index: state.index + 1 };
    case "finished":
      return {
        ...state,
        status: "finish",
        highscore:
          state.highscore < state.points ? state.points : state.highscore,
      };
    case "restart":
      return {
        ...initialState,
        status: "ready",
        questions: state.questions,
        soundOn: state.soundOn,
        highscore: state.highscore,
      };
    case "tick":
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining < 1 ? "finish" : "active",
      };
    case "sound":
      return { ...state, soundOn: !state.soundOn };
    default:
      throw new Error("Unknown action");
  }
}

function App() {
  const [
    {
      questions,
      status,
      index,
      answer,
      points,
      secondsRemaining,
      soundOn,
      highscore,
    },
    dispatch,
  ] = useReducer(reducer, initialState);

  const numQuestions = questions.length;
  const hasAnswered = answer !== null;
  const maxPoints = questions.reduce((prev, cur) => prev + cur.points, 0);

  useEffect(function () {
    async function fetchQuestions() {
      try {
        const res = await fetch(`http://localhost:3000/questions`);
        const data = await res.json();
        dispatch({ type: "dataReceived", payload: data });
      } catch (err) {
        console.log(err.message);
        dispatch({ type: "dataFailed" });
      }
    }
    fetchQuestions();
  }, []);

  useEffect(
    function () {
      const playSound = function () {
        if (!soundOn) return;
        const soundSuccess = new Audio(clickSuccess);
        const soundWrong = new Audio(clickWrong);
        if (answer === questions[index].correctOption) soundSuccess.play();
        if (answer !== questions[index].correctOption) soundWrong.play();
      };
      playSound();
    },
    [soundOn, answer, index, questions]
  );

  return (
    <>
      <Sound dispatch={dispatch} soundOn={soundOn} />
      {status === "loading" && <Loader />}
      {status === "error" && <Error />}
      {status === "ready" && (
        <StartScreen numQuestions={numQuestions} dispatch={dispatch} />
      )}
      {status !== "ready" && <Logo dispatch={dispatch} questions={questions} />}
      {status === "active" && (
        <ActiveScreen>
          <Progress
            numQuestions={numQuestions}
            index={index}
            points={points}
            maxPoints={maxPoints}
          />
          <Options
            question={questions[index]}
            dispatch={dispatch}
            answer={answer}
          />
          <Footer>
            <Timer secondsRemaining={secondsRemaining} dispatch={dispatch} />
            <ButtonNext
              dispatch={dispatch}
              index={index}
              numQuestions={numQuestions}
              hasAnswered={hasAnswered}
            />
          </Footer>
        </ActiveScreen>
      )}
      {status === "finish" && (
        <FinishScreen
          points={points}
          maxPoints={maxPoints}
          dispatch={dispatch}
          highscore={highscore}
        />
      )}
    </>
  );
}

export default App;
