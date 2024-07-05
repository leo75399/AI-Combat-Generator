let roleSpell = (name, isOpponent) => {
  return `我在製作一個決鬥遊戲，我給你一個角色名稱，叫做${name}，請幫我想一段介紹說明文字（角色說明誇張有史詩感一點），以及四個符合他角色的招式，並且每個招式要有一段說明（招式要看起來有傷害性，不用防禦或補助技能），請提供 json 檔案，Json 格式請以下列方式呈現 {"intro":"角色介紹說明文字","nameEnglish":"角色英文名稱","skills":[{"name":"技能一","description":"技能的描述"},{"name":"技能二","description":"技能的描述"},{"name":"技能三","description":"技能的描述"},{"name":"技能四","description":"技能的描述"}]}`;
};

let radomRoleSpell = (p1Name, p1Intro) => {
  return `我在製作一個決鬥遊戲，我給你一個角色名稱，叫做${p1Name}，${p1Intro}，請幫我想一個他的對手，可能來自於他的故事、動畫、電影、影集、年代、產業，幫我想一段對手角色介紹說明文字（角色說明誇張有史詩感一點），以及四個符合對手角色的招式，並且每個招式要有一段說明（招式要看起來有傷害性，不用防禦或補助技能），請提供 json 檔案，Json 格式請以下列方式呈現{"name":"對手角色名稱","nameEnglish":"對手角色英文名稱","intro":"對手角色名稱","skills":[{"name":"技能一","description":"技能的描述"},{"name":"技能二","description":"技能的描述"},{"name":"技能三","description":"技能的描述"},{"name":"技能四","description":"技能的描述"}]}`;
};

let attackSpell = (attaker, defender, skillsName, skillDescription) => {
  return `請模擬一個決鬥過程，角色「${attaker}」將使用絕招「${skillsName}」（招式說明：${skillDescription}）攻擊「${defender}」。請描繪一段角色「${attaker}」的攻擊場景，內含此次攻擊所造成的效果與結果（可以是效果超好、或效果不好、或是無效與沒命中），並告訴我本次傷害值多少（0~40之間，按攻擊的效果提供）。請使用中文回答我，並在70字以內，並使用。請提供 json 檔案，Json 格式請以下列方式 ：{ "attackEffect": "此次攻擊所造成的效果","damage":"傷害值"}`;
};

let createRollImage = (role) => {
  return `${role}, 2D ,facing forward,pixel style,((pixel art)),8-bit,pure white background`;
};
export { roleSpell, radomRoleSpell, attackSpell, createRollImage };
