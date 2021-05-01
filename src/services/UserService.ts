import { UserModel, SessionModel } from "../models"

export class UserService {
	public static async addUser (serverId: string, userId: string, userName: string) {
		const session = await SessionModel.fromServerId(serverId);

		const user = await UserModel.fromUserId(userId) ?? new UserModel({
			handle: userName, 
			personalityData: "", 
			pastMatches: [], 
			id: userId, 
			sessions: []
		});

		user.addSession(session.schema.id)
		session.addUser(user.schema);

		await Promise.all([session.save(), user.save()]);
	}

	public static async pairUsers() {

	}
	
	// TODO: implement
	public static async removeUserFromSession(serverId: string, userId: string) {
		
	};
}