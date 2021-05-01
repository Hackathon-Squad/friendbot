import { MatchModel, SessionModel, SessionTaskModel } from "../models"

const chunk = <E extends unknown>(list: E[], chunkSize: number): E[][] => {
	return [...Array(Math.ceil(list.length / chunkSize))].map((_, i) => list.slice(i*chunkSize,i*chunkSize+chunkSize));
}

export class SessionService {
	public static async startSession(serverId: string, startDate: Date, endDate: Date, messageId: string) {
		// create session object
		const session = new SessionModel({
			serverId, startDate, endDate, messageId, matches: [], users: []
		});
		// push object to firebase
		// schedules pairing function to run after a period of time
		const task = new SessionTaskModel({
			sessionId: session.schema.id, timeToRun: endDate
		});

		await Promise.all([session.save(), task.save()])
	}
	
	public static async pairUsers(serverId: string): Promise<MatchModel[]> {
		const session = await SessionModel.fromServerId(serverId);

		const lastUser = session.schema.users[session.schema.users.length - 1];
		const uneven = session.schema.users.length % 2 !== 0;
		const pairs = chunk(session.schema.users, 2);
		
		if (uneven && pairs.length > 2) {
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

