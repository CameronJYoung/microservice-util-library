import { MessageHandler } from '../utils/eachMessageHandler';

export default interface ITopic {
	topic: string;
	handler: MessageHandler;
}