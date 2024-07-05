import React, { useState } from "react";
import Loading from "../component/Loading";

///不同技能有不同的 class
const getSkillClass = (index) => {
  switch (index) {
    case 0:
      return "nes-btn is-primary";
    case 1:
      return "nes-btn is-success";
    case 2:
      return "nes-btn is-warning";
    case 3:
      return "nes-btn is-error";
    default:
      return "nes-btn";
  }
};
const Combat = ({ character, attacking, opponent, attackResult, setAttackResult, setOpponent, setCharacter, setStatus }) => {
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [combatStatus, setCombatStatus] = useState("opening");
  //opening/selecting/attacking/result/opponentAttacking
  ///玩家點選不同的絕招
  const handleSkillChange = (index) => {
    setSelectedSkill(index);
  };
  ///狀態欄顯示不同的內容
  const handleResultChange = () => {
    switch (combatStatus) {
      case "opening":
        return character["intro"];
      case "selecting":
        return "技能" + selectedSkill + "「" + character["skills"][selectedSkill - 1]["name"] + "」：" + character["skills"][selectedSkill - 1]["description"];
      case "attacking":
        return "攻擊中...";
      case "result":
        return attackResult["p1"];
      case "opponentAttacking":
        return attackResult["p2"];
      default:
        return character["intro"];
    }
  };
  ///結局判定
  let whoWin = (P1Win) => {
    if (P1Win) {
      setStatus("ResultP1");
    } else {
      setStatus("ResultP2");
    }
  };

  return (
    <>
      {!!opponent["photo"] ? (
        <div className="role_wrap">
          <div className="role_sticky-bottom">
            <div className="role p1">
              <div className="role_state">
                <div className="role_name">{character["name"]}</div>
                <div className="role_hp">
                  <progress className="nes-progress is-success" value={character["hp"]} max="100"></progress>
                  <div>{character["hp"]}/100</div>
                </div>
              </div>
              <div
                className={`role_image role_image-float ${combatStatus === "result" ? "role_image-attackRight" : ""}${
                  combatStatus === "opponentAttacking" ? "role_image-beAttack" : ""
                }`}
              >
                <img src={character["photo"]} alt="" />
              </div>
            </div>
            <div className="role p2 ">
              <div
                className={`role_image role_image-float2 ${combatStatus === "result" ? "role_image-beAttack" : ""}${
                  combatStatus === "opponentAttacking" ? "role_image-attackRight" : ""
                }`}
              >
                <img src={opponent["photo"]} alt="" />
              </div>
              <div className="role_state">
                <div className="role_name">{opponent["name"]}</div>
                <div className="role_hp">
                  <progress className="nes-progress is-success" value={opponent["hp"]} max="100"></progress>
                  <div className="role_hpStatus">{opponent["hp"]}/100</div>
                </div>
              </div>
            </div>
          </div>
          <div className="role_sticky-top">
            <div className="role_result">
              <div className="nes-container is-rounded is-dark" style={combatStatus === "opponentAttacking" ? { backgroundColor: "#e76e55" } : {}}>
                <p>{handleResultChange()}</p>
              </div>
            </div>
            <div className="role_skill">
              <div
                className={`skills nes-btn ${combatStatus === "attacking" || combatStatus === "result" || !selectedSkill ? " is-disabled" : ""}`}
                onClick={async () => {
                  if (!!selectedSkill) {
                    setCombatStatus("attacking"); //設定為戰鬥中
                    setSelectedSkill(null); //選定技能清空
                    let p1attackResult = await attacking(
                      character["name"],
                      opponent["name"],
                      character["skills"][selectedSkill - 1]["name"],
                      character["skills"][selectedSkill - 1]["description"]
                    ); //主角攻擊
                    let opponentSkill = Math.floor(Math.random() * 4); //決定對手招式
                    let p2attackResult = await attacking(
                      opponent["name"],
                      character["name"],
                      opponent["skills"][opponentSkill]["name"],
                      opponent["skills"][opponentSkill]["description"],
                      true
                    ); //敵人攻擊
                    setAttackResult({
                      ...attackResult,
                      p1: p1attackResult["attackEffect"],
                      p1Damge: p1attackResult["damage"],
                      p2: `${opponent["name"]}使出「${opponent["skills"][opponentSkill]["name"]}」。${p1attackResult["attackEffect"]}`,
                      p2Damge: p1attackResult["damage"],
                    }); //設定攻擊效果
                    //敵人扣血
                    let opponentHp = opponent["hp"] - p1attackResult["damage"];
                    //主角扣血
                    let characterHp = character["hp"] - p2attackResult["damage"];
                    setTimeout(() => {
                      //顯示主角攻擊結果
                      setCombatStatus("result");
                      setOpponent({ ...opponent, hp: opponentHp });
                    }, 1500);
                    setTimeout(() => {
                      //顯示敵人攻擊結果
                      setCombatStatus("opponentAttacking");
                      setCharacter({ ...character, hp: characterHp });
                    }, 4000);
                    setTimeout(() => {
                      //顯示最終結果
                      if (opponentHp < 0) {
                        //主角勝利
                        whoWin(true);
                      } else if (characterHp < 0) {
                        //敵人勝利
                        whoWin(false);
                      }
                    }, 6000);
                  }
                }}
              >
                {!!selectedSkill ? "🔥 確定" : "⬇️ 選擇"}攻擊{!!selectedSkill ? " 🔥" : "⬇️"}
              </div>
              {character.skills.map((el, i, arr) => {
                return (
                  <label
                    key={i}
                    className={`skills ${getSkillClass(i)}${combatStatus === "attacking" || combatStatus === "result" || selectedSkill === i + 1 ? " is-disabled" : ""} `}
                    onClick={(event) => {
                      if (combatStatus === "attacking" || combatStatus === "result") {
                        event.preventDefault();
                      }
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={selectedSkill === i + 1}
                      onChange={() => {
                        handleSkillChange(i + 1);
                        setCombatStatus("selecting");
                      }}
                    />
                    技能{i + 1}：{el.name}
                  </label>
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default Combat;
