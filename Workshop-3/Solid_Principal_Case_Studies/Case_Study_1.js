// In future it will be a UserAuth Interface
class UserAuth {
  validate(haveToValidateData) {
    console.log("This is validate Data info");
  }
}

// Logut the user
class LogOutUser {
  logOutUser(user) {
    console.log("user Logout succesfully");
  }
}

// Seach from Google and Infuture we can use it as a interface
// because after few days we have to serach fron anywhere
class SearchWithKeyWord {
  async searching(key) {
    console.log(key);
    try {
      const data = await fetch(`/${key}`);
      console.log(data)
      return data;
    } catch (err) {
      throw new Error(err.message);
    }
  }
}

// Insert Into db class
class InsertIntoDb {
  constructor() {
    this.db = [];
  }
  async insertToDb(haveToInsertData) {
    try {
      // here we insert the data into db after search
      const insertedData = await this.db.push(haveToInsertData);
    } catch (err) {
      throw new Error(err.message);
    }
  }
}

// UserService
class UserService {
  constructor(userAuth, search, insertIntoDb, logOutUser) {
    this.userAuth = userAuth;
    this.search = search;
    this.insertToDb = insertIntoDb;
    this.logOutUser = logOutUser;
  }
  logInUser(haveTovalidate) {
    const validatedData = this.userAuth.validate(haveTovalidate);
  }

  logOutUser(user) {
    const logOut = this.logOutUser.logOutUser(user);
  }

  async upload(haveToUplode) {
    const foundInfoFromSearch = await this.search.searching(
      haveToUplode.keyWord
    );
    const uplodedData = await this.insertToDb.insertToDb(foundInfoFromSearch);
  }
}

// Created factory function to inject the needed dependencies
const userFactory = ()=>{
  const userAuth = new UserAuth();
  const search = new SearchWithKeyWord();
  const insertIntoDb = new InsertIntoDb();
  const logOutUser = new LogOutUser();
  return new UserService(userAuth,search,insertIntoDb,logOutUser)
}
/*
class User {
  constructor(userFactory) {
    this.userFactory = userFactory;
  }
}
  */
// Create userService with needed dependencies
const userServices = userFactory();



