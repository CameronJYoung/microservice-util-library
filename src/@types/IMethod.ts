import MethodTypes from './MethodTypes';

export default interface IMethod {
	type: MethodTypes;
	action: string;
	handler: Function;
}