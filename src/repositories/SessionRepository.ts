import firebase from './firebase';
import { MatchSchema, SessionSchema, UserSchema } from '../schemas';

export class SessionRepository {
	private static readonly path = '/sessions/';

	public static async findByServerId(serverId: string): Promise<SessionSchema> {
		const response = await firebase.firestore()
			.doc(SessionRepository.path + serverId)
			.get();
		if (!response.exists) return null;
    return response.data() as SessionSchema;
	}

	public static async createSession(session: SessionSchema): Promise<void> {
		return firebase.firestore()
			.doc(SessionRepository.path + session.serverId)
			.set(session);
	}

	public static async addUserToSession(id: string, user: UserSchema): Promise<void> {
		return firebase.firestore()
			.doc(SessionRepository.path + id)
			.update({
				users: firebase.firestore.FieldValue.arrayUnion(user),
			});
	}

	public static async removeSession(serverId: string): Promise<void> {
		return firebase.firestore().doc(SessionRepository.path + serverId).delete();
	}

	public static removeUserFromSession(id: string, user: UserSchema): Promise<void> {
		return firebase.firestore()
			.doc(SessionRepository.path + id)
			.update({
				users: firebase.firestore.FieldValue.arrayRemove(user),
			});
	}

	public static batchAddMatches(serverId: string, matches: MatchSchema[]) {
		const batch = firebase.firestore().batch();
		console.log(matches)
		matches.forEach((match) => {
			const sessionRef = firebase.firestore().doc(SessionRepository.path + serverId)
			batch.update(sessionRef, {
				matches: firebase.firestore.FieldValue.arrayUnion(match),
			});
		})
	}


}