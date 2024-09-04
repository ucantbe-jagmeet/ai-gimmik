import { GoogleGenerativeAI, GenerativeModel, HarmBlockThreshold, HarmCategory } from "@google/generative-ai";

const genAI: GoogleGenerativeAI = new GoogleGenerativeAI(
  process.env.NEXT_PUBLIC_GEMINI_PUBLIC_KEY!
);
const safetySettings = [
  {
    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
    threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
    threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
  },
];
export const model: GenerativeModel = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  safetySettings,
});


