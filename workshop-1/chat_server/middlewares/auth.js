const jwt = require("jsonwebtoken");
const { getErrorResponse } = require("../utils/responseHandlers");
const { User } = require("../models/user.model");

const verifyToken = async (request, response, next) => {
  const token = request.headers.authorization.split(" ")[1];
  
  if (!token) {
    return getErrorResponse({response, code: 401, message: "Unauthorized access"});
  }
  try {
    const user = new User()
    const decoded = jwt.verify(token, process.env.TOKEN_KEY);
    const userInDB = await user.getUserById(decoded.id);
    
    if (
      decoded &&
      Object.keys(decoded).length > 0 &&
      userInDB.token &&
      userInDB.token === token
    ) {
      request.user = userInDB;
    } else {
      return getErrorResponse({response, code: 401, message: "Unauthorized access"});
    }
  } catch (err) {
    console.log("error", err);
    return getErrorResponse({response, code: 401, message: "Unauthorized access"});
  }
  return next();
};

module.exports = verifyToken;