import React from "react";

function Result({ status, attackResult, character, opponent, setStatus }) {
  return (
    <>
      <div className="middle_wrap result">
        {status === "ResultP1" ? (
          <>
            <div className="result_icon">
              <i className="nes-icon trophy is-large"></i>
            </div>
            <div className="result_container  nes-container with-title is-centered">
              <p>
                {attackResult["p1"]}一舉成功擊敗「{opponent["name"]}」！
              </p>
            </div>
            <h2 className="result_h2">
              {character["name"]} 勝利　<i className="nes-icon is-medium like"></i>
              <i className="nes-icon  is-medium like"></i>
            </h2>
          </>
        ) : (
          <>
            <div className="result_icon">
              <i className="nes-icon close is-large"></i>
            </div>
            <div className="result_container  nes-container with-title is-centered">
              <p>
                {attackResult["p2"]}一舉成功擊敗「{character["name"]}」！
              </p>
            </div>
            <h2>
              {opponent["name"]} 勝利　<i className="nes-icon like"></i>
              <i className="nes-icon like"></i>
            </h2>
          </>
        )}
        <button
          type="button"
          className="nes-btn is-success result_button  "
          onClick={() => {
            setStatus("Start");
          }}
        >
          再玩一局
        </button>
      </div>
    </>
  );
}

export default Result;
