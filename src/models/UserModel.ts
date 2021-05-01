import { BaseModel } from "./BaseModel"
import firebase from "../repositories/firebase"
import { UserSchema } from './schemas';


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
		const schema = await UserModel.schemaFromPath(UserModel.path + id) as UserSchema;
		return new UserModel(schema);
	}

	public static async fromUserId(userId: string) : Promise<UserModel | null> {
		const response = await firebase
			.firestore()
			.collection(UserModel.path)
			.where("id", "==", userId)
			.get();
		
		if (response.size === 0) return null;
		
		const userSchema = response.docs[0].data() as UserSchema;
		return new UserModel(userSchema);
	}

	public addSession(sessionId: string) {
		this.schema.sessions.push(sessionId);
	}

	public removeSession(sessionId: string) {
		this.schema.sessions.splice(this.schema.sessions.indexOf(sessionId), 1)
	}
}