import { Kafka, Producer } from 'kafkajs';

import pino from '../singletons/Logger';
import { jsonToBuffer } from '../utils/messageConversions';

export default class KafkaClient {
	private clientId: string;
	private brokers: Array<string>;
	private kafkaInstance: Kafka;
	private producer: Producer

	constructor(clientId: string, brokers: Array<string>) {
		this.clientId = clientId;
		this.brokers = brokers;

		this.kafkaInstance = new Kafka({
			clientId: this.clientId,
			brokers: this.brokers
		});
		this.producer = this.kafkaInstance.producer();
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
};