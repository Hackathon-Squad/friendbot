// import * as moment from 'moment';
// import { UserModel, MatchModel, SessionModel } from 'src/models';

// export const seed = async () => {
//   console.log("seeding")
// 	// create example data
// 	// hackathon server id 812497760145637406

// 	//Users
// 	const user1 = new UserModel("truly1", "", []);
// 	await user1.save();

// 	const user2 = new UserModel("truly2", "", []);
// 	await user2.save();
	
// 	const user3 = new UserModel("truly3", "", []);
// 	await user3.save();

// 	const user4 = new UserModel("truly4", "", []);
// 	await user4.save();
	
// 	const user5 = new UserModel("truly5", "", []);
// 	await user5.save();

// 	const user6 = new UserModel("truly6", "", []);
// 	await user6.save();

// 	const user7 = new UserModel("truly7", "", []);
// 	await user7.save();

// 	const user8 = new UserModel("truly8", "", []);
// 	await user8.save();

// 	//Matches

// 	const match1 = new MatchModel(user1.handle, user2.handle, "123", "111");
// 	await match1.save();

// 	const match2 = new MatchModel(user3.handle, user4.handle, "456", "222");
// 	await match2.save();

// 	const match3 = new MatchModel(user5.handle, user6.handle, "789", "333");
// 	await match3.save();

// 	const match4 = new MatchModel(user7.handle, user8.handle, "101112", "444");
// 	await match4.save();


// 	//Dates
// 	const now = moment().toDate();
// 	const twoDaysLater = moment().add(2, 'day').toDate();

// 	//Sessions
// 	const session1 = new SessionModel("name1", new Date(), new Date(), "837911221385560115");
// 	const userArr1 = new Array(user1, user2);
// 	session1.setUsers(userArr1);
// 	await session1.save();


// 	const session2 = new SessionModel("name2", new Date(), new Date(), "837911221385560115");
// 	const userArr2 = new Array(user3, user4);
// 	session2.setUsers(userArr2);
// 	await session2.save();


// 	const session3 = new SessionModel("name3", new Date(), new Date(), "837911221385560115");
// 	const userArr3 = new Array(user5, user6);
// 	session3.setUsers(userArr3);
// 	await session3.save();

// }