import React, { useEffect } from "react";
import banner from "../img/banner.gif";
function Start({ setStatus, setCharacter, setOpponent, character }) {
  useEffect(() => {
    if (!!character["name"]) {
      setCharacter({
        name: "",
        nameEnglish: "",
        photo: "",
        intro: "",
        hp: 100,
        skills: [
          {
            name: "",
            description: "",
          },
          {
            name: "",
            description: "",
          },
          {
            name: "",
            description: "",
          },
          {
            name: "",
            description: "",
          },
        ],
      });

      setOpponent({
        name: "",
        nameEnglish: "",
        photo: "",
        intro: "",
        hp: 100,
        skills: [
          {
            name: "",
            description: "",
          },
          {
            name: "",
            description: "",
          },
          {
            name: "",
            description: "",
          },
          {
            name: "",
            description: "",
          },
        ],
      });
    }
  }, []);

  return (
    <>
      <div className="start_top">
        <h1>張飛打岳飛</h1>

        <div className="start_banner">
          <img src={banner} alt="" />
        </div>

        <button
          className="nes-btn is-primary"
          onClick={() => {
            setStatus("SelectP1");
          }}
        >
          開始遊戲
        </button>
      </div>
      <div className="start_down">
        <div>Version 0.2</div>
        <div>🄲 Young</div>
      </div>
    </>
  );
}

export default Start;
