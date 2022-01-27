import KafkaClient from '../classes/KafkaClient';
import KafkaAdminClient from '../classes/KafkaAdminClient';

export default class KafkaClientFactory {
	static getKafkaClient(clientId: string, brokers: Array<string>, groupId: string): KafkaClient {
		return new KafkaClient(clientId, brokers, groupId);
	}
	static getKafkaAdminClient(clientId: string, brokers: Array<string>, groupId: string): KafkaClient {
		return new KafkaAdminClient(clientId, brokers, groupId);
	}
}