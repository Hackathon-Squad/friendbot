import { UserModel, SessionModel } from "../models"

export class UserService {
	public static async addUser (serverId: string, userId: string) {
		const session = await SessionModel.fromServerId(serverId);

		const user = await UserModel.fromUserId(userId) ?? new UserModel({
			handle: userId, 
			personalityData: "", 
			pastMatches: [], 
			id: userId, 
			sessions: []
		});

		user.addSession(session.schema.id)
		session.addUser(user.schema.id);

		await Promise.all([session.save(), user.save()]);
	}

	public static async pairUsers() {

	}
	
	// TODO: implement
	public static async removeUser (serverId: string, userId: string) {
		const session = await SessionModel.fromServerId(serverId);

		const user = await UserModel.fromUserId(userId) ?? new UserModel({
			handle: userId, 
			personalityData: "", 
			pastMatches: [], 
			id: userId, 
			sessions: []
		});

		// user.removeSession(session.schema.id) // TODO
		// session.removeUser(user.schema.id); // TODO

		// await Promise.all([session.save(), user.save()]);
	};
}