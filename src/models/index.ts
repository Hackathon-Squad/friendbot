import User from "./user"
import Match from "./match"
import Session from "./session"
import * as moment from 'moment';

export { User, Match, Session };

export const seed = async () => {
    console.log("seeding")
    // create example data
    // hackathon server id 812497760145637406

    //Users
    const user1 = new User("truly1", "", []);
    await user1.push();

    const user2 = new User("truly2", "", []);
    await user2.push();
    
    const user3 = new User("truly3", "", []);
    await user3.push();

    const user4 = new User("truly4", "", []);
    await user4.push();
    
    const user5 = new User("truly5", "", []);
    await user5.push();

    const user6 = new User("truly6", "", []);
    await user6.push();

    const user7 = new User("truly7", "", []);
    await user7.push();

    const user8 = new User("truly8", "", []);
    await user8.push();

    //Matches

    const match1 = new Match(user1.handle, user2.handle, "123", "111");
    await match1.push();

    const match2 = new Match(user3.handle, user4.handle, "456", "222");
    await match2.push();

    const match3 = new Match(user5.handle, user6.handle, "789", "333");
    await match3.push();

    const match4 = new Match(user7.handle, user8.handle, "101112", "444");
    await match4.push();


    //Dates
    const now = moment().toDate();
    const twoDaysLater = moment().add(2, 'day').toDate();

    //Sessions
    const session1 = new Session("name1", new Date(), new Date());
    const userArr1 = new Array(user1, user2);
    session1.setUsers(userArr1);
    await session1.push();


    const session2 = new Session("name2", new Date(), new Date());
    const userArr2 = new Array(user3, user4);
    session2.setUsers(userArr2);
    await session2.push();


    const session3 = new Session("name3", new Date(), new Date());
    const userArr3 = new Array(user5, user6);
    session3.setUsers(userArr3);
    await session3.push();

}