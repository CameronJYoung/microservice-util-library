import BaseController from "./BaseController";
import ITopic from "../@types/ITopic";

export default class Microservice {
	private controllers: BaseController[];

	constructor(microserviceName: string, controllers: BaseController[]) {
		this.controllers = controllers;
	}

	private aggregateTopics() {
		const allTopics: ITopic[] = [];

		this.controllers.forEach((c) => {
			allTopics.concat(c.getTopics())
		})

		return allTopics;
	}





	public run() {

	}
}