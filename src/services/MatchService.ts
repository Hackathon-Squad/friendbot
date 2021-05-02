import { SessionRepository } from "../repositories/SessionRepository";
import { MatchSchema } from "../schemas";

export class MatchService {
	public static async batchWriteMatches(serverId: string, matches: MatchSchema[]) {
		return SessionRepository.batchAddMatches(serverId, matches);
	}
}