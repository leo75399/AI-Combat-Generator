import React from "react";

const ErrorScreen = ({ error, setStatus }) => {
  return (
    <div className="error">
      <p class="nes-balloon from-left nes-pointer">{error}</p>
      <button type="button" class="nes-btn  is-success" onClick={() => setStatus("Start")}>
        請重新開始
      </button>
    </div>
  );
};

export default ErrorScreen;
