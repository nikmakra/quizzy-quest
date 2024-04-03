function Loader() {
  return (
    <div className="loader">
      <div className="lds-ellipsis">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <p className="loader-text">Please wait a second...</p>
    </div>
  );
}

export default Loader;
