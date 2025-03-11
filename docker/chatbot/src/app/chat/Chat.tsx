"use client";

import { CoreMessage } from 'ai';
import { useState } from 'react';
import { completion } from '../api/chat/_requests';
import { ChatCompletionMessage } from 'openai/resources/index.mjs';

export default function Chat() {
    const [input, setInput] = useState<string>('');
    const [messages, setMessages] = useState<(CoreMessage | ChatCompletionMessage)[]>([]);

    return (
        <div className="flex flex-col gap-2">
            <div className="flex flex-col p-2 gap-4">
                {messages.map((message, index) => (
                    <div key={`${message.role}-${index}`} className={`flex gap-2 ${message.role === "user" ? "flex-row" : "flex-row-reverse text-end"}`}>
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

            <div className="fixed bottom-0 p-2 w-full">
                <input
                    value={input}
                    placeholder="Send message..."
                    onChange={event => {
                        setInput(event.target.value);
                    }}
                    className="bg-zinc-100 w-full p-2"
                    onKeyDown={async event => {
                        if (event.key === 'Enter') {
                            const coreMessage: CoreMessage = ({ role: 'user', content: input })
                            setMessages(currentMessages => [
                                ...currentMessages,
                                coreMessage
                            ]);

                            const response = await completion(input);
                            setInput('');

                            if(response && response.choices[0]) setMessages(currentMessages => [
                                ...currentMessages,
                                response.choices[0].message
                            ]);
                        }
                    }}
                />
            </div>
        </div>
    );
}