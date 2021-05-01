import { UserSchema } from "src/models/schemas";
import firebase from "./firebase";

export class UserRepository {
  private static readonly path = '/users';
  
  public async findById(id: string): Promise<UserSchema> {
    const response = await firebase.firestore().doc(`${UserRepository.path}/${id}`).get();
    return response.data() as UserSchema;
  }

}