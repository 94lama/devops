"use server";
import OpenAI from "openai";

// #region Settings
const configuration = {
  organization: process.env.ORGANIZATION,
  project: process.env.PROJECT,
  apiKey: process.env.OPENAI_API_KEY,
};

const openai = new OpenAI(configuration);
/* const assistant = openai.beta.assistants.create(
  //"jarvis-1"
  {
    name: "Jarvis",
    reasoning_effort: "low",
    instructions: "You are a senior developer, specializeed in OpenAI API",
    tools: [{ type: "code_interpreter" }],
    model: "gpt-4o-mini"
  }
); */
// #endregion Settings

// #region Chat
async function completion(message: string, store: boolean = true) {
  if (!openai) return;

  return await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "developer", content: "You are a helpful assistant." },
      { role: "user", content: message },
    ],
    store: store,
  })
};

export {
  completion,
};

// #endregion Chat