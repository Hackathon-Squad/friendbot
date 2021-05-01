import { BaseModel, Schema } from "./BaseModel"
import firebase from "./firebase"

interface MatchSchema extends Schema {
    users: string[];
    conversations: string[];
    sessionId: string;
    serverId: string;
}

export class MatchModel extends BaseModel {
	public schema: MatchSchema;
	public static path = "/matches/"
	
	constructor(data: MatchSchema) {
		super(data.id, MatchModel.path);
		this.schema = {
			...data,
			id: this.schema.id
		}
	}

	public static async fromId(id: string) : Promise<MatchModel> {
		const schema = await MatchModel.schemaFromPath(`/matches/${id}`) as MatchSchema
		return new MatchModel(schema);
	}
}