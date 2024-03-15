

export const nodemailer_function = async(email,otp) => {
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
          to: email, // list of receivers
          subject: "verify your email", // Subject line
          text: `${otp}`, // plain text body
          html: `<p>${otp}</p>`, // html body
        });
        console.log("Message sent: %s", info.messageId);
      }

      main().catch(console.error);
}