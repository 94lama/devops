"use client";

import { CoreMessage } from 'ai';
import { useState } from 'react';
import { ChatCompletionMessage } from 'openai/resources/index.mjs';
//import { Threads } from 'openai/resources/beta/threads/threads.mjs';
import { completion } from '../../providers/openai';

export default function Chat() {
    const [input, setInput] = useState<string>('');
    const [messages, setMessages] = useState<(CoreMessage | ChatCompletionMessage)[]>([]);
    //const [thread, setThread] = useState();

    return (
        <div className="bg-zinc-200 h-dvh w-dvw flex flex-col justify-between gap-3 p-5">
            <div className="overflow-y-scroll h-full bg-white rounded-md px-4">
                {messages.map((message, index) => (
                    <div key={`${message.role}-${index}`} className={`card flex gap-2 my-2 ${message.role === "user" ? "flex-row" : "flex-row-reverse text-end"}`}>
                        <div className="w-24 text-zinc-500">{`${message.role}`}</div>
                        <div className="w-[75vw]">
                            {typeof message.content === 'string'
                                ? message.content
                                : message.content
                                    ?.filter(part => part.type === 'text')
                                    .map((part, partIndex) => (
                                        <div key={partIndex}>{part.text}</div>
                                    ))}
                        </div>
                    </div>
                ))}
            </div>

            <input
                value={input}
                placeholder="Send message..."
                onChange={event => {
                    setInput(event.target.value);
                }}
                className="bg-zinc-100 w-full p-2 rounded-xl shadow-md"
                onKeyDown={async event => {
                    if (event.key === 'Enter') {
                        const coreMessage: CoreMessage = ({ role: 'user', content: input })
                        setMessages(currentMessages => [
                            ...currentMessages,
                            coreMessage
                        ]);

                        const response = await completion(input);
                        setInput('');

                        if (response && response.choices[0]) setMessages(currentMessages => [
                            ...currentMessages,
                            response.choices[0].message
                        ]);
                    }
                }}
            />
        </div>
    )
}