import KafkaClient from '../classes/KafkaClient';

export default class KafkaClientFactory {
	static getKafkaClient(clientId: string, brokers: Array<string>, groupId: string): KafkaClient {
		return new KafkaClient(clientId, brokers, groupId);
	}
}