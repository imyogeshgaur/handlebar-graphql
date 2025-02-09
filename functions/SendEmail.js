import { createTransport } from "nodemailer"

const transportConfig = {
  host: process?.env?.SMTP_HOST,
  port: process?.env?.SMTP_PORT,
  auth: {
    user: process?.env?.SERVICE_EMAIL,
    pass: process?.env?.SERVICE_EMAIL_PASSWORD,
  },
};

const sendEmailtoUser = (email,userId)=>{

}