const nodeMailer = require('nodemailer');

const sendEmail =async(options) =>{
    const transpoter = nodeMailer.createTransport({
        service: process.env.SMTP_SERVICE,
        host:"smpt.gmail.com",
        //port: 456,
        auth:{
            user: "temp54107@gmail.com",
            pass: "baic accj mcee frdj"
        },
    });

    const mailOptions = {
        from: process.env.SMTP_MAIL,
        to: options.email,
        subject: options.subject,
        text: options.message
    };
    await transpoter.sendMail(mailOptions);


}

module.exports = sendEmail;