import { connect } from "mongoose";
const connectTheDB = async()=>{
    try {
        await connect(process?.env?.DB_URL);
        console.log("Connected !!!");
    } catch (error) {
        console.log("Error in connecting to Mongo!!!",error);
    }
}

export default connectTheDB