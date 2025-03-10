"use server";

import { CoreMessage } from "ai";
import OpenAI from "openai";
import { ChatCompletion, ChatCompletionContentPartText } from "openai/resources/index.mjs";

const client = new OpenAI({
  organization: process.env.ORGANIZATION,
  project: process.env.PROJECT,
  apiKey: process.env.OPENAI_API_KEY,
});

async function test(): Promise<ChatCompletion> {
  const chatCompletion = await client.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      { role: "system", content: "You are a helpful assistant." },
      { role: 'user', content: 'Say this is a test' }
    ],
    store: true,
  });

  return chatCompletion;
}

const completion = async (message: string, store: boolean = true) =>
  await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "developer", content: "You are a helpful assistant." },
      {
        role: "user",
        content: message,
      },
    ],
    store: store,
  });

export {
  test,
  completion
};