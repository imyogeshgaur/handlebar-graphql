import { Router } from "express";
const authrouter = Router();
import { request } from "graphql-request";
import { CREATE_USER_MUTATION, GRAPHQL_URL } from "../graphql/Mutations.js";

authrouter.post("/login", async (req, res) => {
  try {
    res.render("login");
  } catch (error) {
    console.log("Error in routing login page:", error);
  }
});

authrouter.get("/register", (req, res) => {
  try {
    res.render("register",{url:`http://localhost:${process?.env?.PORT}`});
  } catch (error) {
    console.log("Error in routing register page:", error);
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
    console.log("Error at ");
  }
});

export default authrouter;
