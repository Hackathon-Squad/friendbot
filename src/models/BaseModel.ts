import { DocumentReference } from '@firebase/firestore-types';
import { v4} from "uuid"
import firebase from "./firebase"

export interface Schema {
	id?: string;
}

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
