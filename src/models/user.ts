import { v4 } from "uuid"
import firebase from "./firebase"


export default class User {

    public id: string
    public handle: string
    public personalityData: string
    public pastMatches: string[]
    public FIREBASE_PATH: string

    constructor(handle: string, personalityData: string, pastMatches: string[]) {
        this.id = v4()
        this.handle = handle
        this.personalityData = personalityData
        this.pastMatches = pastMatches
        this.FIREBASE_PATH = `/users/${this.id}`
    }

    public static async fromId(serverId: string, userId: string) {
        const data = await (await firebase.database().ref(`/servers/${serverId}/users/${userId}`).get()).val()
        return new User(data.handle, data.personalityData, data.pastMatches);
    }


    async push() {
        await firebase.database().ref(this.FIREBASE_PATH).set(this.pack())
    }

    pack() {
        return {
            "id": this.id,
            "handle": this.handle,
            "personalityData": this.personalityData,
            "pastMatches": this.pastMatches
        }
    }
}