import { Knex } from 'knex';

export interface Reader<T> {
	find(item: Partial<T>): Promise<T[]>
}

export type IBaseRepository<T> = Reader<T>

export default abstract class BaseRepository<T> implements IBaseRepository<T> {
	constructor(
		public readonly knex: Knex,
		public readonly tableName: string
	) {}

	public get qb(): Knex.QueryBuilder {
		return this.knex(this.tableName)
	}

	find(item: Partial<T>): Promise<T[]> {
		return this.qb.where(item).select();
	}
}