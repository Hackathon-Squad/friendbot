import { BaseModel } from "./BaseModel"
import firebase from "../repositories/firebase"
import { SessionSchema, UserSchema } from './schemas';


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

	public addUser(user: UserSchema) {
		this.schema.users.push(user);
	}

	public removeUser(userId: string) {
		// this.schema.users = this.schema.users
		// 	.filter((user) => user.schema.id !== userId);
	}
}