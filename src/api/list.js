import axios from "axios";

const { GoogleGenerativeAI, HarmBlockThreshold, HarmCategory } = require("@google/generative-ai");

const gemini_API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;
const getimg_API_KEY = process.env.REACT_APP_GETIMG_API_KEY;

// Access your API key (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(gemini_API_KEY);

//文字設定
//安全設定
const safeSetting = [
  {
    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
    threshold: HarmBlockThreshold.BLOCK_NONE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
    threshold: HarmBlockThreshold.BLOCK_NONE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
    threshold: HarmBlockThreshold.BLOCK_NONE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
    threshold: HarmBlockThreshold.BLOCK_NONE,
  },
];
// The Gemini 1.5 models are versatile and work with most use cases
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash", safeSetting });
const generationConfig = {
  temperature: 0.55,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};

//文字ai
async function run(prompt) {
  ///執行AI
  // The Gemini 1.5 models are versatile and work with both text-only and multimodal prompts
  const chatSession = model.startChat({
    generationConfig,
    // safetySettings: Adjust safety settings
    // See https://ai.google.dev/gemini-api/docs/safety-settings
    history: [],
  });
  try {
    const result = await chatSession.sendMessage(prompt);
    const response = await result.response;
    // console.log("🚀 AI整包結果", response);
    const text = response.text();
    // console.log("🚀 ai回傳的物件", text);
    return JSON.parse(text);
  } catch (error) {
    // console.error("Error running AI model:", error);
    throw new Error("Google Gemini 偷偷跟我說，他怕你這樣會起爭議...所以請你重新考慮一下。"); // 抛出自定义错误消息
  }
}
//圖片設定
const getimgHead = {
  headers: {
    accept: "application/json",
    authorization: `Bearer ${getimg_API_KEY}`,
  },
};
//圖片ai
const callAiImage = async (prompt) => {
  return axios
    .post(
      "https://api.getimg.ai/v1/latent-consistency/text-to-image",
      {
        prompt: prompt,
        negative_prompt: "signature,bad quality,bad anatomy",
        width: 384,
        height: 384,
        steps: 7,
        output_format: "jpeg",
        response_format: "url",
      },
      getimgHead
    )
    .then((response) => {
      //   console.log("getimg回傳整包", response.data);
      //   console.log(response.data["url"]);
      return response.data["url"];
    })
    .catch((error) => {
      throw new Error("看起來是免費的製圖 AI 過載，請稍晚再試。...你應該不會覺得失業的人用得起付費的吧..."); // 抛出自定义错误消息
    });
};

export { run, callAiImage };
