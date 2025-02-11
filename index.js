import { startStandaloneServer } from "@apollo/server/standalone";
import { ApolloServer } from "@apollo/server";
import typeDefs from "./graphql/TypeDefs.js";
import resolvers from "./graphql/Resolvers.js"
import connectTheDB from "./db/db.config.js";
import express, { json, urlencoded } from "express"
import { expressMiddleware } from "@apollo/server/express4";
import authrouter from "./routes/auth.routes.js";
import { resolve } from "path";
import { config } from "dotenv";
config({ path: resolve("./.env") });

connectTheDB();

const app = express();

app.use(urlencoded({extended:true}))
app.use(json())

app.set("views", "./views");
app.set("view engine",'hbs')



app.get("/",(_,res)=>{
    try {
        res.render("login",{url:`http://localhost:${process?.env?.PORT}`})
    } catch (error) {
        console.log("Error in rendering login page : ",error);
        response(500, "Internal server error !!!");
    }
})

app.use("/auth",authrouter)

const graphqlServer = new ApolloServer({
  typeDefs,
  resolvers,
});
await graphqlServer.start()
app.use("/graphql", expressMiddleware(graphqlServer));

app.listen(process?.env?.PORT,()=>{
    console.log(`Frontend Server is running at http://localhost:${process?.env?.PORT}`)
    console.log(`Backend Server is running at http://localhost:${process?.env?.PORT}/graphql`);
})

