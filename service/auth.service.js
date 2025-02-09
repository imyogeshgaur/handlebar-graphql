import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/User.js";
import { v4 } from "uuid";
import response from "../functions/Response.js";

class AuthService {
  async loginUser(args) {
    try {
      const { emailOfUser, password } = args?.loginData;
      const isEmailVerified = await User.findOne({ emailOfUser });
      return isEmailVerified?.password
        ? (await bcrypt.compare(password, isEmailVerified?.password))
          ? response(
              200,
              jwt.sign(
                { userId: isEmailVerified?.userId },
                process?.env?.JWT_SECRET
              )
            )
          : response(401, "Invalid Credentials !!!")
        : response(401, "Invalid Credentials !!!");
    } catch (error) {
      console.log("Error occurred at login service !!!", error);
      response(500, "Internal server error !!!");
    }
  }

  async registerUser(args) {
    try {
      const isEmailVerified = await User.findOne({
        emailOfUser: args?.registerData?.emailOfUser,
      });
      if (isEmailVerified?.emailOfUser)
        return response(401, "User with email already exist");
      const hashedPassword = await bcrypt.hash(
        args?.registerData?.password,
        12
      );
      const userId = v4();
      const newUser = await User.create({
        userId,
        ...args?.registerData,
        password: hashedPassword,
      });
      const savedUser = await newUser.save();
      if (savedUser) return response(200, "User created Sucessfully !!!");
    } catch (error) {
      console.log("Error occurred at register service !!!", error);
      response(500, "Internal server error !!!");
    }
  }

  async forgetPassword(args) {
    try {
      
    } catch (error) {
      console.log("Error occurred at forget password service !!!", error);
      response(500, "Internal server error !!!");
    }
  }

  async resetPassword(args) {
    try {
    } catch (error) {
      console.log("Error occurred at reset password service !!!", error);
      response(500, "Internal server error !!!");
    }
  }
}

const authService = new AuthService();
export default authService;
