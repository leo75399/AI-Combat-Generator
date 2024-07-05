import React from "react";
const radomRoles = ["張飛", "美國隊長", "皮卡丘", "旋渦鳴人", "魯夫"];

let selectRadomRole = (nowName) => {
  let availableRoles = radomRoles;
  if (nowName) {
    availableRoles = radomRoles.filter((radomRoles) => radomRoles !== nowName);
  }
  let randomIndex = Math.floor(Math.random() * availableRoles.length);
  let newRole = availableRoles[randomIndex];
  return newRole;
};

function SelectP1({ character, setCharacter, createRole, setStatus }) {
  return (
    <>
      <div className="middle_wrap">
        <div className="selectRole_q">
          <label htmlFor="p1_name">請輸入你想選擇的角色</label>
        </div>
        <div className="selectRole_input">
          <input
            id="p1_name"
            type="text"
            value={character["name"]}
            onChange={(e) => {
              setCharacter({ ...character, name: e.target.value });
            }}
            className="nes-input"
          />
        </div>
        <div className="selectRole_button">
          <button
            className={`nes-btn is-success  ${!!character["name"] ? "" : "is-disabled"}`}
            onClick={() => {
              if (!!character["name"]) {
                createRole(character["name"]);
                setStatus("SelectP2");
              }
            }}
          >
            角色確認
          </button>
          <button
            className="nes-btn"
            onClick={() => {
              let radomRoles = selectRadomRole(character["name"]);
              setCharacter({ ...character, name: radomRoles });
            }}
          >
            系統建議
          </button>
        </div>
        <div className="selectRole_tip">
          <i className="nes-pokeball"></i>
          <p className="nes-balloon from-left ">建議不要使用「政治人物」、「爭議人物」，AI爸爸會擋。</p>
        </div>
      </div>
    </>
  );
}

export default SelectP1;
