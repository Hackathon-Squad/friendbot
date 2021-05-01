import Match from "./match"
import User from "./user"
import { v4 } from "uuid"
import firebase from "./firebase"


export default class Session {
    public id: string
    public serverName: string;
    public startDate: Date;
    public endDate: Date;
    public matches: Match[];
    public users: User[];
    public FIREBASE_PATH: string


    constructor(serverName: string, startDate: Date, endDate: Date) {
        this.id = v4();
        this.serverName = serverName;
        this.startDate = startDate;
        this.endDate = endDate;
        this.matches = [];
        this.users = [];
        this.FIREBASE_PATH = `/sessions/${this.id}`
    }

    public static async fromId(serverId: string, sessionId: string) {
        const data = await (await firebase.database().ref(`/servers/${serverId}/sessions/${sessionId}`).get()).val()
        return new Session(data.serverName, data.startDate, data.endDate);
    }

    setUsers(users: User[]) {

        this.users = users;

    }

    setMatches(matches: Match []) {
        this.matches = matches;
    }

    async push() {
        await firebase.database().ref(this.FIREBASE_PATH).set(this.pack())
    }

    pack() {
        return {
            "id" : this.id,
            "serverName" : this.serverName,
            "startDate" : this.startDate,
            "endDate" : this.endDate,
            "matches" : this.matches,
            "users" : this.users
        }
    }
}