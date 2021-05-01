import { DocumentReference } from '@firebase/firestore-types';
import { BaseModel, Schema } from "./BaseModel"
import firebase from "./firebase"

interface SessionTaskSchema extends Schema {
    sessionId: string;
    timeToRun: Date;
}

export class SessionTaskModel extends BaseModel {
	public schema: SessionTaskSchema;
	public static path = "/sessiontasks/";
	
	constructor(data: SessionTaskSchema) {
		super(data.id, SessionTaskModel.path);
		this.schema = {
			...data,
			id: this.schema.id
		}
	}

	public static async fromId(id: string) : Promise<SessionTaskModel> {
		const schema = await SessionTaskModel.schemaFromPath(`/sessiontasks/${id}`) as SessionTaskSchema
		return new SessionTaskModel(schema);
	}
}