import { PartialUser, User } from "discord.js";
import { MatchSchema } from "src/schemas";
import { SessionRepository } from "../repositories/SessionRepository";

/**
 * Splits a list into several lists of size chunkSize
 * @param list list to split
 * @param chunkSize the size of lists to split into
 * @returns array of arrays of size chunkSize
 */
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
	public static async pairUsers(serverId: string): Promise<MatchSchema[]> {
		const session = await SessionRepository.findByServerId(serverId);
		const lastUser = session.users[session.users.length - 1];
		const isUserCountUneven = session.users.length % 2 !== 0;
		const pairs = chunk(session.users, 2);
		
		if (isUserCountUneven && pairs.length > 1) {
			pairs.splice(pairs.length - 1, 1); // remove last user
			pairs[pairs.length - 1].push(lastUser);
		}

		const matchObjects: MatchSchema[] = [];
		
		for (const pair of pairs) {
			matchObjects.push({
				users: pair,
				serverId,
				sessionId: serverId,
			});
		}

		return matchObjects;
	}
	
}

