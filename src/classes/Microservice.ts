import BaseController from "./BaseController";
import ITopic from "../@types/ITopic";
import KafkaClient from "./KafkaClient";

export default class Microservice {
	public microserviceName: string;
	private controllers: BaseController[];
	private kafkaClient: KafkaClient;
	private microserviceTopics: ITopic[];
	private adminTopic: string|null;

	constructor(microserviceName: string, controllers: BaseController[], kafkaClient: KafkaClient, adminTopic: string|null) {
		this.microserviceName = microserviceName;
		this.controllers = controllers;
		this.kafkaClient = kafkaClient;
		this.microserviceTopics = this.aggregateTopics();
		this.adminTopic = adminTopic;
	}

	private aggregateTopics() {
		const allTopics: ITopic[] = [];

		this.controllers.forEach((c) => {
			allTopics.concat(c.getTopics())
		})

		return allTopics;
	}



	public async run() {
		if (this.adminTopic) {
			this.kafkaClient.produceMessage({
				microserviceName: this.microserviceName,
				topics: this.microserviceTopics
			}, `${this.adminTopic}.registerService`)
			
		}
		await this.kafkaClient.listenToTopics(this.microserviceTopics);
	}
}