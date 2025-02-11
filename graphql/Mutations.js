import { gql } from "graphql-request";
import { resolve } from "path";
import { config } from "dotenv";
config({ path: resolve("./.env") });

export const GRAPHQL_URL = `http://localhost:${process?.env?.PORT}/graphql`;

export const CREATE_USER_MUTATION = gql`
  mutation RegisterUser($registerData: register!) {
    registerUser(registerData: $registerData) {
      statusCode
      message
    }
  }
`;

export const LOGIN_USER_MUTATION = gql`
  mutation LoginUser($loginData: login!) {
    loginUser(loginData: $loginData) {
      statusCode
      message
    }
  }
`;

export const FORGET_PASSWORD_MUTATION = gql`
  mutation ForgetPassword($emailOfUser: String!) {
    forgetPassword(emailOfUser: $emailOfUser) {
      statusCode
      message
    }
  }
`;
