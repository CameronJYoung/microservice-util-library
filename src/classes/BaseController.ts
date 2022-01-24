import IMethod from '../@types/IMethod';
import ITopic from '../@types/ITopic';

export default abstract class BaseController {
	protected serviceName: string;
	abstract methods(): IMethod[]

	constructor(serviceName: string) {
		this.serviceName = serviceName;
	}

	public getTopics() {
		const methods = this.methods();
		const serviceName = this.serviceName;
		const topicArr: ITopic[] = [];

		methods.forEach((m) => {
			topicArr.push({
				topic: `${m.type}.${serviceName}.${m.action}`,
				handler: m.handler
			})
		})

		return topicArr;
	}
}