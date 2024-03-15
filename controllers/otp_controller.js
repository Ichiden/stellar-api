
import Otp from "../models/otp_model.js";
import {nodemailer_function} from "../utils/nodemailer.js"
import bcrypt from 'bcrypt'
import nodemailer from 'nodemailer'

export const sendOtp = async(email,res) => {
    try{
        const otp = `${Math.floor(1000 + Math.random() * 9000)}`;
        const hashedOTP = await bcrypt.hash(otp,10);

        const otpUser = await Otp.find({email});
        const otpUserLength = Number(otpUser.length)

        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
              user: "denverbigayan1@gmail.com",
              pass: "smvu kwyz byrv bcex",
            },
          });

          async function main() {
            const info = await transporter.sendMail({
              from: '<denverbigayan1@gmail.com>', // sender address
              to: `${email}`, // list of receivers
              subject: "verify your email", // Subject line
              text: `${otp}`, // plain text body
              html: `<p>${otp}</p>`, // html body
            });
            return res.json('sent');
          }

          await main().catch(console.error);

          if(otpUserLength === 0){
            const NewOtpVerification = await Otp.create({
              email:email,
              otp:hashedOTP,
              createdAt: Date.now(),
              expiredAt: Date.now() + 360000
            })
          }else{
            const updateOtpVerification = await Otp.findByIdAndUpdate({_id:otpUser[0]._id}, {
              email:email,
              otp:hashedOTP,
              createdAt: Date.now(),
              expiredAt: Date.now() + 360000
            })
          }
          

    }catch(err){
        console.log(err)
    }
}



