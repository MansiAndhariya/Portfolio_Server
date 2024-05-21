var express = require("express");
var router = express.Router();
var ContactMail = require("../modals/ContactMail");
const moment = require("moment");
const nodemailer = require("nodemailer");

router.post("/contact_mail", async (req, res) => {
  try {
    console.log("object")
    const timestamp = Date.now();
    const uniqueId = `${timestamp}`;
    req.body["email_id"] = uniqueId;
    req.body["createdAt"] = moment().format("YYYY-MM-DD HH:mm:ss");
    req.body["updatedAt"] = moment().format("YYYY-MM-DD HH:mm:ss");

    var data = await ContactMail.create(req.body);


        const transporter = nodemailer.createTransport({
            host: 'smtp.hostinger.com',
            port: 587,
            secure: false,
            auth: {
              user: 'info@andhariabasu.com',
              pass: 'MansiBasu@1319',
            },
          //   tls: {
          //     rejectUnauthorized: false,
          //   },
          });
        const info = await transporter.sendMail({
          from: `${req.body.name} <info@andhariabasu.com>`, 
          to: 'basu.code@gmail.com',
          subject: "Portfolio - Inquiry",
          html: `     
            <p>Hello Basu Andhariya,</p>
            
            <p>You have new contact inquiry</p>
            
            <ul>
              <li><strong>Name :</strong> ${req.body.name}</li>
              <li><strong>Email :</strong> ${req.body.email}</li>
              <li><strong>Message :</strong> ${req.body.message}</li>
            </ul>
            
            <p>Thank you</p>
            
            <p>Best regards,<br>Mansi</p>
          `,
        });
      
        console.log('Email sent:', info.messageId);
     
        // console.error('Error sending email:', error);
      
    res.json({
      statusCode: 200,
      data: data,
      message: "Add Email Successfully",
    });
  } catch (error) {
    res.json({
      statusCode: 500,
      message: error.message,
    });
  }
});

module.exports = router;
