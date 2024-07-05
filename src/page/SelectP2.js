import React from "react";
import Loading from "../component/Loading";

const SelectP2 = ({ opponent, setOpponent, createRole, radomOpponent, character, setCharacter, setStatus, createRoleImg }) => {
  return (
    <>
      {!!character["intro"] ? (
        <div className="middle_wrap">
          <div className="selectRole_q">
            <label htmlFor="p2_name">請輸入你的對手</label>
          </div>
          <div className="selectRole_input">
            <input
              id="p2_name"
              type="text"
              className="nes-input"
              value={opponent["name"]}
              onChange={(e) => {
                setOpponent({ ...opponent, name: e.target.value });
              }}
            />
          </div>
          <div className="selectRole_button">
            <button
              className={`nes-btn is-success  ${!!opponent["name"] ? "" : "is-disabled"}`}
              onClick={async () => {
                if (!!opponent["name"]) {
                  setStatus("Combat");
                  let p1photoUrl = await createRoleImg(character["nameEnglish"], false); //創建主角圖片
                  setCharacter({ ...character, photo: p1photoUrl });
                  let result = await createRole(opponent["name"], true); //創建對手角色
                  let p2photoUrl = await createRoleImg(result["nameEnglish"], true); //創建對手照片
                  setOpponent({ ...opponent, intro: result["intro"], skills: result["skills"], nameEnglish: result["nameEnglish"], photo: p2photoUrl });
                }
              }}
            >
              對手確認
              <br />
              開始遊戲
            </button>
            <button
              id="redomOpponent"
              className="nes-btn is-warning"
              onClick={async () => {
                setStatus("Combat");
                let p1photoUrl = await createRoleImg(character["nameEnglish"], false); //創建主角圖片
                setCharacter({ ...character, photo: p1photoUrl });
                let result = await radomOpponent(character["name"], character["intro"]); ///創建隨機對手角色
                let p2photoUrl = await createRoleImg(result["nameEnglish"], true); //創建對手照片
                setOpponent({ ...opponent, name: result["name"], intro: result["intro"], skills: result["skills"], nameEnglish: result["nameEnglish"], photo: p2photoUrl });
              }}
            >
              隨機生成 <br />
              開始遊戲
            </button>
          </div>
          <div className="selectRole_tip">
            <i className="nes-pokeball"></i>
            <p className="nes-balloon from-left ">建議不要使用「政治人物」、「爭議人物」，AI爸爸會擋。</p>
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default SelectP2;
