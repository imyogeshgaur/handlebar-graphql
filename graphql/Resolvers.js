import authService from "../service/auth.service.js"

const resolvers = {
    Query:{
        
    },
    Mutation:{
        loginUser:async(_,loginData)=>{
            return await authService.loginUser(loginData)
        },
        registerUser:async(_,registerData)=>{
            return await authService.registerUser(registerData)
        },
        forgetPassword:async(_,emailOfUser)=>{
            return await authService.forgetPassword(emailOfUser);
        },
        resetPassword:async(_,password)=>{
            return await authService.resetPassword(password);
        }
    }
}

export default resolvers