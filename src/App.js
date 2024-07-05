// src/App.js
import React, { useState } from "react";
import "nes.css/css/nes.min.css";
import "./css/style.min.css";
import { roleSpell, radomRoleSpell, attackSpell, createRollImage } from "./component/promptList";
import { run, callAiImage } from "./api/list";

// TODO:提示詞被禁（處理錯誤） 圖片錯誤處理（沒錢）
import Start from "./page/Start";
import SelectP1 from "./page/SelectP1";
import SelectP2 from "./page/SelectP2";
import Combat from "./page/Combat";
import Result from "./page/Result";
import ErrorScreen from "./page/ErrorScreen"; // 假设你有一个错误画面组件

function App() {
  const [status, setStatus] = useState("Start");
  const [attackResult, setAttackResult] = useState({
    p1: "",
    p2: "",
    attacking: "攻擊中...",
  });
  const [character, setCharacter] = useState({
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
  const [opponent, setOpponent] = useState({
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
  const [error, setError] = useState(null); // 用于追踪错误状态

  ///創建角色
  let createRole = async (insertName, isOpponent) => {
    try {
      let prompt = roleSpell(insertName, isOpponent); //角色的咒語
      let result = await run(prompt); //丟給 ai
      if (isOpponent) {
        return result;
      } else {
        setCharacter({ ...character, intro: result["intro"], skills: result["skills"], nameEnglish: result["nameEnglish"] });
      }
    } catch (error) {
      handleError(error);
    }
  };

  ////生成隨機對手
  let radomOpponent = async (p1Name, p1Intro) => {
    try {
      let prompt = radomRoleSpell(p1Name, p1Intro);
      let result = await run(prompt); //丟給 ai
      return result;
    } catch (error) {
      handleError(error);
    }
  };

  ///角色圖片生成
  let createRoleImg = async (roleEngName) => {
    try {
      let prompt = createRollImage(roleEngName);
      let photoUrl = await callAiImage(prompt);
      return photoUrl;
    } catch (error) {
      handleError(error);
    }
  };

  ///角色攻擊
  let attacking = async (attaker, defender, skillsName, skillDescription) => {
    try {
      let prompt = attackSpell(attaker, defender, skillsName, skillDescription); //角色的咒語
      let result = await run(prompt); //丟給 ai
      return result;
    } catch (error) {
      handleError(error);
    }
  };
  //發生錯誤

  let handleError = (error) => {
    setStatus("error");
    setError(error.message); // 设置错误信息
  };
  return (
    <main>
      {(() => {
        switch (status) {
          case "error":
            return <ErrorScreen error={error} setStatus={setStatus} />;

          case "Start":
            return <Start setStatus={setStatus} setCharacter={setCharacter} character={character} setOpponent={setOpponent} opponent={opponent} />;
          case "SelectP1":
            return <SelectP1 character={character} setCharacter={setCharacter} createRole={createRole} setStatus={setStatus} />;
          case "SelectP2":
            return (
              <SelectP2
                opponent={opponent}
                setOpponent={setOpponent}
                createRole={createRole}
                radomOpponent={radomOpponent}
                character={character}
                setCharacter={setCharacter}
                setStatus={setStatus}
                createRoleImg={createRoleImg}
              />
            );
          case "Combat":
            return (
              <Combat
                character={character}
                attacking={attacking}
                opponent={opponent}
                attackResult={attackResult}
                setAttackResult={setAttackResult}
                setOpponent={setOpponent}
                setCharacter={setCharacter}
                setStatus={setStatus}
              />
            );
          case "ResultP1":
          case "ResultP2":
            return <Result character={character} opponent={opponent} status={status} attackResult={attackResult} setStatus={setStatus} />;

          default:
            return <Start />;
        }
      })()}
    </main>
  );
}

export default App;
