import { ChatOllama } from "@langchain/ollama";
import { HumanMessage, AIMessage } from "langchain";

const model = new ChatOllama({
  model: "llama3:8b",
  baseUrl: "http://localhost:11434",
});

const chatHistory: (HumanMessage | AIMessage)[] = [];

export async function getAIResponse(userInput: string) {
  const humanMsg = new HumanMessage(userInput);
  chatHistory.push(humanMsg);

  const inputForModel =
    chatHistory
      .map((msg) =>
        msg instanceof HumanMessage ? `User: ${msg.text}` : `Bot: ${msg.text}`
      )
      .join("\n") + "\nBot:";

  const response = await model.invoke(inputForModel);

  const aiMsg = new AIMessage(response);
  chatHistory.push(aiMsg);

  console.log("AI Response:", response.content);
  return response.content;
}
