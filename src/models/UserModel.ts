import { BaseModel, Schema } from "./BaseModel"
import firebase from "./firebase"

interface UserSchema extends Schema {
	handle: string;
	personalityData: string;
	pastMatches: string[];
	sessions: string[];
}

export class UserModel extends BaseModel {
	public schema: UserSchema;
	public static path = "/users/";
	
	constructor(data: UserSchema) {
		super(data.id, UserModel.path);
		this.schema = {
			...data,
			id: this.schema.id
		}
	}

	public static async fromId(id: string) : Promise<UserModel> {
		const schema = await UserModel.schemaFromPath(`/users/${id}`) as UserSchema
		return new UserModel(schema);
	}

	public static async fromUserId(userId: string) : Promise<UserModel | null> {
		const response = await firebase.firestore().collection(UserModel.path).where("id", "==", userId).get()
		if (response.size > 0) {
			return new UserModel(response.docs[0].data() as UserSchema);
		} else {
			return null;
		}
	}

	public addSession(sessionId: string) {
		this.schema.sessions.push(sessionId);
	}

	public removeSession(sessionId: string) {
		this.schema.sessions.splice(this.schema.sessions.indexOf(sessionId), 1)
	}
}