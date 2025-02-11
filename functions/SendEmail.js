import { createTransport } from "nodemailer";
import response from "./Response.js";
import { resolve } from "path";
import { config } from "dotenv";
config({ path: resolve("./.env") });

const transportConfig = createTransport({
  host: process?.env?.SMTP_HOST,
  port: process?.env?.SMTP_PORT,
  auth: {
    user: process?.env?.SERVICE_EMAIL,
    pass: process?.env?.SERVICE_EMAIL_PASSWORD,
  },
});

const sendEmailtoUser = async (emailOfUser,nameOfUser, userId) => {
  try {
    const emailObject = {
      from: process?.env?.SERVICE_EMAIL,
      to: emailOfUser,
      subject: "Reset Your Password",
      html: `
        <html>
        <head>
        </head>
        <body>
            Dear ${nameOfUser} we recieved a password Reset Request From you.<br><br>
            <a href="http://localhost:5173/resetPassword/${userId}">Reset Password</a> <br><br>
            Thanks and Regards
            <br>
            Yogesh Gaur
        </body>
        </html>
      `,
    };
    const data = await transportConfig.sendMail(emailObject);
    return data 
        ?
          {
            statusCode:200,
            message:"Email sent successfully !!!"
          }
        :
          {
            statusCode:400,
            message:"Error in sending email"
          } 

  } catch (error) {
    console.log("error in sending email : ",error);
    return response(500,"Error in sending email !!!")
  }
};

export default sendEmailtoUser;
