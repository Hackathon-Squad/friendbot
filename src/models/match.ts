import { v4 } from "uuid"
import firebase from "./firebase"


export default class Match {
    public FIREBASE_PATH: string;
    public id: string;
    public handle1: string;
    public handle2: string;
    public conversationId: string;
    public serverId: string;

    constructor(handle1: string, handle2: string, conversationId: string, serverId: string, id = v4()) {
        this.id = id;
        this.serverId = serverId;
        this.FIREBASE_PATH = `/servers/${this.serverId}/matches/${this.id}`
        this.handle1 = handle1;
        this.handle2 = handle2;
        this.conversationId = conversationId;    
    }

    public static async fromId(serverId: string, matchId: string) {
        const data = await (await firebase.database().ref(`/servers/${serverId}/matches/${matchId}`).get()).val()
        return new Match(data.handle1, data.handle2, data.conversationId, data.serverId, data.id);
    }


    
    public async push() {
        await firebase.database().ref(this.FIREBASE_PATH).set(this.pack())
    }

    pack() {
        return {
            "id" : this.id,
            "serverId": this.serverId,
            "handle1": this.handle1,
            "handle2": this.handle2,
            "conversationId": this.conversationId,
        }
    }
}