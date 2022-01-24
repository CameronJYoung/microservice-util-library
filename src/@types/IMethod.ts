import MethodTypes from './MethodTypes';
import MessageHandler from '../@types/MessageHandler';

export default interface IMethod {
	type: MethodTypes;
	action: string;
	handler: MessageHandler;
}