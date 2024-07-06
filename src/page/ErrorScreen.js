import React from "react";

const ErrorScreen = ({ error, setStatus }) => {
  return (
    <div className="error">
      <p className="error_p nes-balloon from-left nes-pointer">{error}</p>
      <button type="button" class="error_button nes-btn  is-success" onClick={() => setStatus("Start")}>
        請重新開始
      </button>
    </div>
  );
};

export default ErrorScreen;
