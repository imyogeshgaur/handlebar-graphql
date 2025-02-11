import { Router } from "express";
const authrouter = Router();
import { request } from "graphql-request";
import {
  CREATE_USER_MUTATION,
  FORGET_PASSWORD_MUTATION,
  GRAPHQL_URL,
  LOGIN_USER_MUTATION,
} from "../graphql/Mutations.js";
import response from "../functions/Response.js";

authrouter.post("/login", async (req, res) => {
  try {
    const { emailOfUser, password } = req?.body;
    const loginData = { emailOfUser, password };
    const responseFromGraphQL = await request(
      GRAPHQL_URL,
      LOGIN_USER_MUTATION,
      { loginData }
    );
    return res
      .status(responseFromGraphQL?.loginUser?.statusCode)
      .send({ message: responseFromGraphQL?.loginUser?.message });
  } catch (error) {
    console.log("Error in fetching login page data :", error);
    response(500, "Internal server error !!!");
  }
});

authrouter.get("/register", (_, res) => {
  try {
    res.render("register", { url: `http://localhost:${process?.env?.PORT}` });
  } catch (error) {
    console.log("Error in routing register page:", error);
    response(500, "Internal server error !!!");
  }
});

authrouter.post("/registerData", async (req, res) => {
  try {
    const { nameOfUser, emailOfUser, phoneOfUser, password } = req?.body;
    const registerData = { nameOfUser, emailOfUser, phoneOfUser, password };
    const responseFromGraphQL = await request(
      GRAPHQL_URL,
      CREATE_USER_MUTATION,
      { registerData }
    );
    return res
      .status(responseFromGraphQL?.registerUser?.statusCode)
      .send({ message: responseFromGraphQL?.registerUser?.message });
  } catch (error) {
    console.log("Error in fetching register page data : ", error);
    response(500, "Internal server error !!!");
  }
});

authrouter.get("/forgetPassword", async (_, res) => {
  try {
    res.render("forgetPassword", {
      url: `http://localhost:${process?.env?.PORT}`,
    });
  } catch (error) {
    console.log("Error in routing forget password page:", error);
    response(500, "Internal server error !!!");
  }
});

authrouter.post("/forgetPasswordData", async (req, res) => {
  try {
    const responseFromGraphQL = await request(
      GRAPHQL_URL,
      FORGET_PASSWORD_MUTATION,
      { emailOfUser: req?.body?.emailOfUser }
    );
    return res
      .status(responseFromGraphQL?.forgetPassword?.statusCode)
      .send({ message: responseFromGraphQL?.forgetPassword?.message });
  } catch (error) {
    console.log("Error in fetching forget password page data : ", error);
    response(500, "Internal server error !!!");
  }
});

export default authrouter;
