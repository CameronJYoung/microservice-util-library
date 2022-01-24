import MessageHandler from '../@types/MessageHandler';

export default interface ITopic {
	topic: string;
	handler: MessageHandler;
}