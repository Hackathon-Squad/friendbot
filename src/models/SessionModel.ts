import { DocumentReference } from '@firebase/firestore-types';
import { BaseModel, Schema } from "./BaseModel"
import firebase from "./firebase"

interface SessionSchema extends Schema {
	serverId: string;
	startDate: Date;
	endDate: Date;
	matches: string[];
	users: string[];
	messageId: string;
}

export class SessionModel extends BaseModel {
	public schema: SessionSchema;
	public static path = "/sessions/";
	
	constructor(data: SessionSchema) {
		super(data.id, SessionModel.path);
		this.schema = {
			...data,
			id: this.schema.id
		}
	}

	public static async fromId(id: string): Promise<SessionModel> {
		const schema = await SessionModel.schemaFromPath(`/sessions/${id}`) as SessionSchema
		return new SessionModel(schema);
	}

	public static async fromServerId(serverId: string) : Promise<SessionModel> {
		const response = await firebase.firestore().collection(SessionModel.path).where("serverId", "==", serverId).get()
		return new SessionModel(response.docs[0].data() as SessionSchema);
	}

	public addUser(userId: string) {
		this.schema.users.push(userId);
	}

	public removeUser(userId: string) {
		this.schema.users.splice(this.schema.users.indexOf(userId), 1)
	}
}