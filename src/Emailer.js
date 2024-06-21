import nodemailer from 'nodemailer';

const sendMail = async (email,FirstName,LastName, text,phone,subject) => {
    try {
        const Fullname= FirstName+" "+LastName;
        const transporter = nodemailer.createTransport({
            host: process.env.HOST,
            port: Number(process.env.EMAIL_PORT),
            secure: Boolean(process.env.SECURE),
            auth: {
                user: process.env.USER,
                pass: process.env.PASS
            }
        });
        await transporter.sendMail({
            from: process.env.USER,
            to: email,
            subject: '',
            text: `
            dear ${Fullname},
            Thanks For Contacting Team Will Contact You Shortly
            Regards 
            pavan singh rao
            `,
        });
        await transporter.sendMail({
            from: process.env.USER,
            to: 'raopavansingh007@gmail.com',
            subject: `Inquerry from ${Fullname}`,
            text: `${Fullname},Contacted Us For ${text} His Contact Info:${phone}`,
        });
      
    } catch (error) {
        console.log(error.message, "Email not sent");
    }
};

export default sendMail;
