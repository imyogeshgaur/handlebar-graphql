const typeDefs = `#graphql

type User{
    userID:ID!
    nameOfUser:String!
    emailOfUser:String! 
    phoneOfUser:String
    password:String! 
}

input register{
    nameOfUser:String!
    emailOfUser:String! 
    phoneOfUser:String
    password:String! 
}

input login{
    emailOfUser:String! 
    password:String!
}

type Response{
    statusCode:Int!
    message:String!
}

type Query{
    getAllUsers:[User]
    getSingleUser(userId:ID!):User
}

type Mutation{
    loginUser(loginData:login!):Response!
    registerUser(registerData:register!):Response!
    forgetPassword(emailOfUser:String!):Response!
    resetPassword(password:String!):Response!
}
`;
export default typeDefs