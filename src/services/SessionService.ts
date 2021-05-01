import { PartialUser, User } from "discord.js";
import { SessionRepository } from "../repositories/SessionRepository";
import { MatchModel, SessionModel, SessionTaskModel } from "../models"

const chunk = <E extends unknown>(list: E[], chunkSize: number): E[][] => {
	return [...Array(Math.ceil(list.length / chunkSize))].map((_, i) => list.slice(i*chunkSize,i*chunkSize+chunkSize));
}

export class SessionService {
	public static async initializeSession(serverId: string, startDate: Date, endDate: Date, messageId: string) {
		await SessionRepository.createSession({
			serverId,
			startDate,
			endDate,
			messageId,
		});

		// schedules pairing function to run after a period of time
		// const task = new SessionTaskModel({
		// 	sessionId: session.schema.id, timeToRun: endDate
		// });

		// await Promise.all([session.save(), task.save()])
	}

	public static async findSessionByServerId(serverId: string) {
		return SessionRepository.findByServerId(serverId);
	}

	public static async addUserToSession(serverId: string, user: User | PartialUser) {
		const handle = user.tag;
		const userSchema = { handle, id: user.id }
		await SessionRepository.addUserToSession(serverId, userSchema);
	}

	public static async removeSession(serverId: string) {
		await SessionRepository.removeSession(serverId);
	}

	public static async removeUserFromSession(serverId: string, userId: string) {
		const usersInSession = await SessionRepository.findByServerId(serverId);
		const user = usersInSession.users.filter(user => user.id === userId)[0];
		return SessionRepository.removeUserFromSession(serverId, user);
	}

	
	// TODO: refactor
	public static async pairUsers(serverId: string): Promise<MatchModel[]> {
		const session = await SessionModel.fromServerId(serverId);

		const lastUser = session.schema.users[session.schema.users.length - 1];
		const isUserCountUneven = session.schema.users.length % 2 !== 0;
		const pairs = chunk(session.schema.users, 2);
		
		if (isUserCountUneven && pairs.length > 2) {
			pairs.splice(pairs.length - 1, 1); // remove last user
			pairs[pairs.length - 1].push(lastUser);
		}

		const matchObjects: MatchModel[] = [];
		
		for (const pair of pairs) {
			matchObjects.push(new MatchModel({
				users: pair,
				conversations: [],
				sessionId: session.schema.id,
				serverId: serverId
			}));
		}

		return matchObjects;
	}
	
}

