export type Message = { content: string; author: string; timestamp: Date }
export type Conv = { id: string; name: string; entrants: string[]; messages: Message[] }