import { expect } from 'chai';
import sinon from 'sinon';

import BaseController from '../../src/classes/BaseController';
import Microservice from '../../src/classes/Microservice';
import KafkaClient from '../../src/classes/KafkaClient';
import IMethod from '../../src/@types/IMethod';
import MethodTypes from '../../src/@types/MethodTypes';
import ITopic from '../../src/@types/ITopic';
import { isEqual } from 'lodash';

describe('Microservice class tests', () => {
	it('Microservice topics should be a concatenated based off all controllers ', (done) => {
		const kafkaClientStub = sinon.createStubInstance(KafkaClient);

		const exampleHandler = async () => {};

		const expectedTopicList = [
			{ topic: 'GET.hello.testAction', handler: exampleHandler },
			{ topic: 'POST.hello.testAction2', handler: exampleHandler },
			{ topic: 'PUT.hello.testAction3', handler: exampleHandler },
			{ topic: 'DELETE.hello.testAction4', handler: exampleHandler },
			{ topic: 'GET.hello1.testAction', handler: exampleHandler },
			{ topic: 'POST.hello1.testAction2', handler: exampleHandler },
			{ topic: 'PUT.hello1.testAction3', handler: exampleHandler },
			{ topic: 'DELETE.hello1.testAction4', handler: exampleHandler },
			{ topic: 'GET.hello2.testAction', handler: exampleHandler },
			{ topic: 'POST.hello2.testAction2', handler: exampleHandler },
			{ topic: 'PUT.hello2.testAction3', handler: exampleHandler },
			{ topic: 'DELETE.hello2.testAction4', handler: exampleHandler },
		  ];
		const exampleMethods: IMethod[] = [
			{
				type: MethodTypes.GET,
				action: 'testAction',
				handler: exampleHandler
			},
			{
				type: MethodTypes.POST,
				action: 'testAction2',
				handler: exampleHandler
			},
			{
				type: MethodTypes.PUT,
				action: 'testAction3',
				handler: exampleHandler
			},
			{
				type: MethodTypes.DELETE,
				action: 'testAction4',
				handler: exampleHandler
			}
		];

		class TestController extends BaseController {
			public methods(): IMethod[] {
				return exampleMethods;
			}
		}


		const testControllers: BaseController[] = [
			new TestController('hello'),
			new TestController('hello1'),
			new TestController('hello2')
		]

		const sut = new Microservice(
			'testing microservice',
			testControllers,
			kafkaClientStub,
			null
		);


		const topicList = sut.topicList;
		
		expect(isEqual(topicList, expectedTopicList)).to.be.equal(true);
		done();
	});
});
