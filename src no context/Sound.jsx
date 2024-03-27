function Sound({ dispatch, soundOn }) {
  return (
    <img
      onClick={() => dispatch({ type: "sound" })}
      className="sound"
      src={soundOn === true ? "sound-on.svg" : "sound-off.svg"}
    ></img>
  );
}

export default Sound;
