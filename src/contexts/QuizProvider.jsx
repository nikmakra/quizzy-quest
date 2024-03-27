import { createContext, useContext, useEffect, useReducer } from "react";
import clickWrong from "../../public/click-wrong.wav";
import clickSuccess from "../../public/click-success.wav";

const QuizContext = createContext();

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

function QuizProvider({ children }) {
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
  const question = questions[index];

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
    <QuizContext.Provider
      value={{
        questions,
        status,
        index,
        answer,
        points,
        secondsRemaining,
        soundOn,
        highscore,
        numQuestions,
        maxPoints,
        hasAnswered,
        dispatch,
        question,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

function useQuiz() {
  const context = useContext(QuizContext);
  if (context === undefined)
    throw new Error("QuizContext was used outside of QuizProvider");
  return context;
}

export { QuizProvider, useQuiz };
