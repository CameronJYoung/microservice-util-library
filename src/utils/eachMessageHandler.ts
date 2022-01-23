import { EachMessagePayload } from "kafkajs";

export type MessageHandler = (payload: EachMessagePayload, topic: string) => Promise<void>;