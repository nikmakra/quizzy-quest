import { StartScreen } from "./components/StartScreen";
import ActiveScreen from "./components/ActiveScreen";
import Options from "./components/Options";
import Progress from "./components/Progress";
import FinishScreen from "./components/FinishScreen";
import Timer from "./components/Timer";
import Loader from "./components/Loader";
import Footer from "./components/Footer";
import Error from "./components/Error";
import Logo from "./components/Logo";
import Sound from "./components/Sound";
import ButtonNext from "./components/ButtonNext";
import { useQuiz } from "./contexts/QuizProvider";

function App() {
  const { status } = useQuiz();

  return (
    <>
      <Sound />
      {status === "loading" && <Loader />}
      {status === "error" && <Error />}
      {status === "ready" && <StartScreen />}
      {status !== "ready" && <Logo />}
      {status === "active" && (
        <ActiveScreen>
          <Progress />
          <Options />
          <Footer>
            <Timer />
            <ButtonNext />
          </Footer>
        </ActiveScreen>
      )}
      {status === "finish" && <FinishScreen />}
    </>
  );
}

export default App;
