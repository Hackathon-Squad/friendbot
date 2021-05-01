import { v4 } from "uuid"
import firebase from "../repositories/firebase"
import { Schema } from './schemas';


export abstract class BaseModel {
  public schema: Schema;
  public path: string;

  constructor(id: string = v4(), path: string) {
    this.schema = {};
    this.schema.id = id;
    this.path = path + id;
  }

  public async save() {
    return firebase.firestore().doc(this.path).set(this.schema);
  }

  public static async schemaFromPath(path: string) : Promise<Schema> {
    const response = await firebase.firestore().doc(path).get()
    return response.data();
  }
}
