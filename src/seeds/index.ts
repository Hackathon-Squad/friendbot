import { SessionRepository } from "../repositories/SessionRepository";
import { UserSchema } from "../schemas"

export const seedUsers = async (sessionId: string) => {
  const users: UserSchema[] = getDuplicateUsers(); 
  return Promise.all(users.map(user => SessionRepository.addUserToSession(sessionId, user)));
};

export const getDuplicateUsers = (): UserSchema[] => {
  return [
    { handle: 'Shravan#8282', id: '198622954941054985' },
    { handle: 'Shravan#8282', id: '198622954941054985' },
    { handle: 'Shravan#8282', id: '198622954941054985' },
    { handle: 'Shravan#8282', id: '198622954941054985' },
    { handle: 'Shravan#8282', id: '198622954941054985' },
    { handle: 'Shravan#8282', id: '198622954941054985' },
    { handle: 'LSD#3251', id: '322405093972508684' },
    { handle: 'LSD#3251', id: '322405093972508684' },
    { handle: 'LSD#3251', id: '322405093972508684' },
    { handle: 'LSD#3251', id: '322405093972508684' },
    { handle: 'LSD#3251', id: '322405093972508684' },
    { handle: 'LSD#3251', id: '322405093972508684' },
    { handle: 'truly#5810', id: '261357590829596674' },
    { handle: 'truly#5810', id: '261357590829596674' },
    { handle: 'truly#5810', id: '261357590829596674' },
    { handle: 'truly#5810', id: '261357590829596674' },
    { handle: 'truly#5810', id: '261357590829596674' },
    { handle: 'truly#5810', id: '261357590829596674' },
  ];
}
