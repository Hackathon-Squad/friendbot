import { SessionModel, SessionTaskModel } from "../models"

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
		console.log(session.path)
		console.log(task.path)
		await Promise.all([session.save(), task.save()])
	}
	
}
