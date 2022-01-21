import { expect } from 'chai';
import _ from 'lodash';
import { jsonToBuffer, bufferToJson } from '../../src/utils/messageConversions';

interface IExampleMessage {
	some: string;
	example: number;
	object: string;
}

describe('Kafka message conversion tests', () => {
	it('Json is is converted successfully', (done) => {
		const exampleMessage: IExampleMessage = {
			some: 'hello',
			example: 432,
			object: 'gfdfh345fg'
		}

		const buffer = jsonToBuffer(exampleMessage);
		const convertedBuffer = bufferToJson<IExampleMessage>(buffer);

		expect(_.isEqual(exampleMessage, convertedBuffer)).to.be.true;
		done();
	});
});
