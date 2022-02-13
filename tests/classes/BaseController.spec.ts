import { expect } from 'chai';
import { isEqual } from 'lodash';

import IMethod from '../../src/@types/IMethod';
import ITopic from '../../src/@types/ITopic';
import MethodTypes from '../../src/@types/MethodTypes';

import BaseController from '../../src/classes/BaseController';

describe('BaseController class tests', () => {
	it('controller should return an array of topics based on methods provided', (done) => {
		const serviceName = 'testService';
		const exampleMethods: IMethod[] = [
			{
				type: MethodTypes.GET,
				action: 'testAction',
				handler: async () => {

				}
			},
			{
				type: MethodTypes.POST,
				action: 'testAction2',
				handler: async () => {

				}
			},
			{
				type: MethodTypes.PUT,
				action: 'testAction3',
				handler: async () => {

				}
			},
			{
				type: MethodTypes.DELETE,
				action: 'testAction4',
				handler: async () => {

				}
			}
		];
		const expectedTopics: ITopic[] = [
			{
				topic: `${exampleMethods[0].type}.${serviceName}.${exampleMethods[0].action}`,
				handler: exampleMethods[0].handler
			},
			{
				topic: `${exampleMethods[1].type}.${serviceName}.${exampleMethods[1].action}`,
				handler: exampleMethods[1].handler
			},
			{
				topic: `${exampleMethods[2].type}.${serviceName}.${exampleMethods[2].action}`,
				handler: exampleMethods[2].handler
			},
			{
				topic: `${exampleMethods[3].type}.${serviceName}.${exampleMethods[3].action}`,
				handler: exampleMethods[3].handler
			}
		]
		class TestController extends BaseController {
			public methods(): IMethod[] {
				return exampleMethods;
			}
		}
		const sut = new TestController(serviceName);

		const topics = sut.getTopics();
		
		expect(isEqual(topics, expectedTopics)).to.be.equal(true);
		done();
	});
});
