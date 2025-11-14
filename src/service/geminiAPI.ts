import axios from "axios";
import type { AIPayload } from "../type/AIPayload";

export const botRespone = async (history: AIPayload[]): Promise<string> => {
  const formattedHistory = history.map(
    ({ role, text }: { role: string; text: string }) => ({
      role,
      parts: [{ text }],
    })
  );

  const response = await axios.post(
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent",
    { contents: formattedHistory },
    {
      headers: { "Content-Type": "application/json" },
      params: { key: "AIzaSyDC7W0zDLfunzMLqAIIIcM-J90b-J9fFd8" },
    }
  );
  if (!response.data) throw new Error("Something went wrong!");

  const apiResponse = response.data.candidates[0].content.parts[0].text.trim();
  console.log("AI: " + apiResponse);
  return apiResponse;
};
