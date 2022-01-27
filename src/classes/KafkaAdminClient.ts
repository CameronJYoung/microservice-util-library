import { ITopicConfig } from 'kafkajs';

import KafkaClient from "./KafkaClient";

export default class KafkaAdminClient extends KafkaClient {
	private admin = this.kafkaInstance.admin();

	public async getAllTopics() {
		return await this.admin.listTopics();
	}

	public async createTopic(topicId: string) {
		const topic: ITopicConfig = {
			topic: topicId
		}

		return await this.admin.createTopics({
			validateOnly: false,
			waitForLeaders: true,
			timeout: 20000,
			topics: [topic]
		})
	}
}