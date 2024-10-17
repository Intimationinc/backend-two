const { User } = require("../models/user.model");
const { getErrorResponse, getSuccessResponse } = require("../utils/responseHandlers");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

module.exports = {
    createUser: async (request, response) => {
        try {
            const { username, email, password } = request.body;

            if (!(email && password && username)) {
                return getErrorResponse({ response, code: 400, message: "Missing required fields" });
            } else {
                const user = new User();
                const existingUser = await user.getUserByEmail(email);

                if (!existingUser) {
                    await user.createUser({
                        username,
                        email,
                        password,
                    });
                    return getSuccessResponse({
                        response,
                        code: 201,
                        message: "Registration is successful, Please login"
                    });
                }
                else {
                    return getErrorResponse({ response, code: 409, message: "Email already exists" });
                }
            }
        } catch (err) {
            console.log("error", err.message);

            return getErrorResponse({ response, code: 500, message: "Something went wrong!" });
        }
    },
    login: async (request, response) => {
        try {
            const { email, password } = request.body;

            if (!(email && password)) {
                return getErrorResponse({ response, code: 400, message: "Missing required fields" });
            } else {
                const user = new User();
                const existingUser = await user.getUserByEmail(email);

                if (existingUser?.email) {
                    const isPasswordCorrect = await bcrypt.compare(password, existingUser?.password);
                    if (isPasswordCorrect) {
                        // password is correct
                        // generate jwt token
                        const token = jwt.sign(
                            {
                                id: existingUser.id,
                                email: existingUser.email,
                                userName: existingUser.userName,
                            },
                            process.env.TOKEN_KEY,
                            {
                                expiresIn: process.env.TOKEN_EXIPRATION_TIME,
                            }
                        );
                        // create expiraion timestamp
                        const expirationDuration = Number(process.env.TOKEN_EXIPRATION_TIME.split("s")[0]);

                        const expirationTimestamp = Math.floor(Date.now() / 1000) + expirationDuration;
                        // store tokena and timestamp in db
                        const isTokenAndExpirationTimeSavedInDB = await user.login({ token, expirationTimestamp, userId: existingUser.id })

                        // once token and timestamp is saved send user success response with his information
                        const userData = { ...existingUser, token };
                        // remove the password
                        delete userData.password;

                        return getSuccessResponse({
                            response,
                            code: 200,
                            message: "Login is successful",
                            data: userData
                        });

                    }
                    return getErrorResponse({ response, code: 409, message: "Email already exists" });
                }
                else {
                    return getErrorResponse({ response, code: 401, message: "Invalid login or password. Please try again." });
                }
            }
        } catch (err) {
            console.log("error", err.message);

            return getErrorResponse({ response, code: 500, message: "Something went wrong!" });
        }
    },
};