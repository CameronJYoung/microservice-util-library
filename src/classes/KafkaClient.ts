import { Consumer, Kafka, Producer, EachMessagePayload } from 'kafkajs';

import pino from '../singletons/Logger';
import { jsonToBuffer } from '../utils/messageConversions';
import { MessageHandler } from '../utils/eachMessageHandler';

export interface ITopic {
	topic: string;
	handler: MessageHandler
}

export default class KafkaClient {
	private clientId: string;
	private brokers: Array<string>;
	private kafkaInstance: Kafka;
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

	public async produceMessage(message: Record<string, unknown>) {
		await this.producer.connect().catch((err) => {
			pino.error(err);
			return;
		});
	
		await this.producer.send({
			topic: 'testing-topic',
			messages: [
				{
					value: jsonToBuffer(message)
				}
			]
		}).catch((err) => {
			console.log(err);
			return;
		});
	}

	public async listenToTopics(topics: ITopic[]) { // INSERT INTERFACE HERE CONTAINING TOPICS AND HANDLER MAYBE INPUT?
		await this.consumer.connect();
		console.log(1);
		
		topics.forEach(async (i) => {
			await this.consumer.subscribe({topic: i.topic});

			await this.consumer.run({
				eachMessage: async (message) => {
					i.handler(message, i.topic);
				}
			});
		});


	}
};