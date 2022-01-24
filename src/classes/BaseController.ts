import IMethod from '../@types/IMethod';

export default abstract class BaseController {
	protected serviceName: string;
	abstract methods(): IMethod[]

	constructor(serviceName: string) {
		this.serviceName = serviceName;
	}

	public getTopics() {
		const methods = this.methods();
		const serviceName = this.serviceName;
		const topicArr: string[] = [];

		methods.forEach((m) => {
			topicArr.push(`${m.type}.${serviceName}.${m.action}`)
		})

		return topicArr;
	}
}