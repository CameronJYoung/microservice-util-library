import IMethod from '../../src/@types/IMethod';
import MethodTypes from '../../src/@types/MethodTypes';

import { expect } from 'chai';

import BaseController from '../../src/classes/BaseController';

describe('BaseController class tests', () => {
	it('classes extending base controller should have a public method returning an array of topics', (done) => {
		const serviceName = 'testService';
		const actionName = 'testAction';

		const exampleMethod: IMethod = {
			type: MethodTypes.GET,
			action: actionName,
			handler: async () => {

			}
		};

		class TestController extends BaseController {
			public methods(): IMethod[] {
				return [
					exampleMethod
				]
			}
		}
		const testController = new TestController(serviceName);
		
		expect(testController.getTopics()[0]).to.contain(serviceName).and.to.contain(actionName);
		done();
	});
});
