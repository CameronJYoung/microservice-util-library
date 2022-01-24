import MethodTypes from './MethodTypes';
import { MessageHandler } from '../utils/eachMessageHandler'

export default interface IMethod {
	type: MethodTypes;
	action: string;
	handler: MessageHandler;
}