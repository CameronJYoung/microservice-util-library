import { EachMessagePayload } from "kafkajs";

type MessageHandler = (payload: EachMessagePayload, topic: string) => Promise<void>;

export default MessageHandler;