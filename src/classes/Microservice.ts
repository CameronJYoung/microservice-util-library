import { IBaseController } from "./BaseController";
import ITopic from "../@types/ITopic";
import { IKafkaClient } from "./KafkaClient";

export interface IMicroservice {
	microserviceName: string;
	run: () => Promise<void>;
}

export default class Microservice implements IMicroservice {
	public microserviceName: string;
	private controllers: IBaseController[];
	private kafkaClient: IKafkaClient;
	private microserviceTopics: ITopic[];
	private adminTopic: string|null;

	constructor(microserviceName: string, controllers: IBaseController[], kafkaClient: IKafkaClient, adminTopic: string|null) {
		this.microserviceName = microserviceName;
		this.controllers = controllers;
		this.kafkaClient = kafkaClient;
		this.microserviceTopics = this.aggregateTopics();
		this.adminTopic = adminTopic;
	}

	private aggregateTopics() {
		let allTopics: ITopic[] = [];

		this.controllers.map((c) => {			
			allTopics = allTopics.concat(c.getTopics())
		})
		
		return allTopics;
	}

	get topicList(): ITopic[] {
		return this.microserviceTopics;
	}

	public async run(): Promise<void> {
		if (this.adminTopic) {
			this.kafkaClient.produceMessage({
				microserviceName: this.microserviceName,
				topics: this.microserviceTopics
			}, `${this.adminTopic}.registerService`)
		}
		await this.kafkaClient.listenToTopics(this.microserviceTopics);
	}
}