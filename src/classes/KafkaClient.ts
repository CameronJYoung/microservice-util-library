import { Consumer, Kafka, Producer, EachMessagePayload } from 'kafkajs';

import pino from '../singletons/Logger';
import { jsonToBuffer } from '../utils/messageConversions';
import ITopic from '../@types/ITopic';

export interface IKafkaClient {
	produceMessage: (C: Record<string, unknown>, A: string) => Promise<void>;
	listenToTopics: (C: ITopic[]) => Promise<void>;
	listenToTopic: (C: ITopic) => Promise<void>;
}

export default class KafkaClient implements IKafkaClient {
	protected kafkaInstance: Kafka;
	private clientId: string;
	private brokers: Array<string>;
	private producer: Producer;
	private consumer: Consumer;

	constructor(clientId: string, brokers: Array<string>, groupId: string) {
		this.clientId = clientId;
		this.brokers = brokers;

		this.kafkaInstance = new Kafka({
			clientId: this.clientId,
			brokers: this.brokers,
		});

		this.producer = this.kafkaInstance.producer();
		this.consumer = this.kafkaInstance.consumer({ groupId: groupId });
	}

	public async produceMessage(message: Record<string, unknown>, topic: string) {
		await this.producer.connect().catch((err) => {
			pino.error(err);
			return;
		});
	
		await this.producer.send({
			topic: topic,
			messages: [
				{
					value: jsonToBuffer(message)
				}
			]
		}).catch((err) => {
			pino.error(err);
			return;
		});
	}

	public async listenToTopics(topics: ITopic[]) {
		await this.consumer.connect();
		console.log(4);
		
		topics.map(async (i) => {
			await this.consumer.subscribe({topic: i.topic});

			await this.consumer.run({
				eachMessage: async (message) => {
					i.handler(message, i.topic);
				}
			});
		});


	}

	public async listenToTopic(topic: ITopic) {
		await this.consumer.connect();
		
		await this.consumer.subscribe({topic: topic.topic});

		await this.consumer.run({
			eachMessage: async (message) => {
				topic.handler(message, topic.topic);
			}
		});


	}
};