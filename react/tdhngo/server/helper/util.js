import config from "config";
import Joi from "joi";
import jwt from 'jsonwebtoken';
import Sender from 'aws-sms-send';
import nodemailer from 'nodemailer';
import cloudinary from 'cloudinary';
import twilio from 'twilio';
import qrcode from 'qrcode';
import axios from 'axios';
import status from '../enums/status';
import csprng from 'secure-random';
import FCM from "fcm-push";
const len = 32;
var aws_topic = 'arn:aws:sns:us-east-1:729366371820:coinbaazar';
var config2 = {
    AWS: {
        accessKeyId: config.get('AWS.accessKeyId'),
        secretAccessKey: config.get('AWS.secretAccessKey'),
        region: config.get('AWS.region')
    },
    topicArn: aws_topic,
};

var sender = new Sender(config2);
cloudinary.config({
    cloud_name: config.get('cloudinary.cloud_name'),
    api_key: config.get('cloudinary.api_key'),
    api_secret: config.get('cloudinary.api_secret')
});

const accountSid = config.get('twilio.accountSid');
const authToken = config.get('twilio.authToken');
const client = require('twilio')(accountSid, authToken);

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(config.get("sendGridKey"));

module.exports = {

    getOTP() {
        var otp = Math.floor(1000 + Math.random() * 9000);
        return otp;
    },

    sendEmailOtp: async (email, otp, userName) => {
        // var sub = `Use the One Time Password(OTP)  ${otp}  to verify your account. `
        let html = `<div
style="background-color:rgb(255, 255, 255); border-width:1px; border-style: solid; border-color: #000000; height: 380px; width:750px">
    <center> <img src=${logo} alt="company logo" width="180" height="70"></center>
<div style="font-size:20px; text-align:left; margin-left: 1rem; margin-right: 1rem; margin-top: auto;">
    <p>Hi ${userName},</p>
    <p>Your Email One Time Password (OTP) to log in to your <b>Social Platform</b> account is ${otp}.<br>
        The OTP is valid for 5 minutes.
    </p>
    <p>
        Thanks,<br>
        <b>Social Platform Team</b>
    </p>
</div>
</div>`


        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                "user": config.get('nodemailer.email'),
                "pass": config.get('nodemailer.password'),
                // "user": "customerservice@ejobbing.com",
                // "pass": "Thrive123"

            }
        });
        var mailOptions = {
            from: '<do_not_reply@gmail.com>',
            to: email,
            subject: 'Your Email OTP to Sign Up to your MAS account',
            // text: sub,
            html: html
        };
        await transporter.sendMail(mailOptions)

    },

    getReferralCode() {
        var x = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (var i = 0; i < 8; i++) {
            x += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return x;
    },
    generateUserId(userId) {
        var str = "" + (userId + 1)
        var pad = "00000"
        var ans = pad.substring(0, pad.length - str.length) + str
        return "User" + ans;
    },
    generateFeedbackId(feedbackId) {
        var str = "" + (feedbackId + 1)
        var pad = "00000"
        var ans = pad.substring(0, pad.length - str.length) + str
        return   ans;
    },

    sendSms: (number, otp) => {
        sender.sendSms(`Your mobile One Time Password (OTP) to log in to your <b>Social Platform</b> account is ${otp}.<br>
    The OTP is valid for 5 minutes.`, config.get('AWS.smsSecret'), false, number)
            .then(function (response) {
                return response;
            })
            .catch(function (err) {
                return err;
            })

    },

    getToken: async (payload) => {
        var token = await jwt.sign(payload, config.get('jwtsecret'), { expiresIn: "24h" })
        return token;
    },

    getImageUrl: async (files) => {
        try {
            var result = await cloudinary.v2.uploader.upload(files[0].path, { resource_type: "auto" })
            return result.secure_url;
        } catch (error) { console.log(error); return error }
    },
    getImageUrl2: async (path) => {
        try {
            var result = await cloudinary.v2.uploader.upload(path, { resource_type: "auto" })
            return result.secure_url;
        } catch (error) { console.log(error); return error }
    },

    genBase64: async (data) => {
        return await qrcode.toDataURL(data);
    },

    getSecureUrl: async (base64) => {
        var result = await cloudinary.v2.uploader.upload(base64, { resource_type: "auto" });
        return result.secure_url;
    },

    sendSmsTwilio: async (mobileNumber, otp) => {
        try {
            return await client.messages.create({
                body: `Your mobile One Time Password (OTP) to log in to your Social Platform account is ${otp}.The OTP is valid for 5 minutes.`,
                to: mobileNumber,
                from: config.get('twilio.number')
            })
        } catch (error) {
            console.log('160 ==>', error)
        }
    },
    generatePrivateKey() {
        const address = ab2hexstring(csprng(len));
        return address;
    },


    pushNotification: async (deviceToken, title, body, callback) => {
        console.log(deviceToken);
        var serverKey = 'BN2eHxzbptKxovCi1cvqsGtPFCwn5yeEfeK2aNtQEsUZaLWUeQZB35tSKsCj463JsgOoxVKkI0z0Yb7PO_3AGZY';
        var fcm = new FCM(serverKey);
        var message = {
            to: deviceToken, // required fill with device token or topics
            "content_available": true,
            notification: {
                title: title,
                body: body
            },
            // data: data2
        };
        //callback style
        fcm.send(message, function (err, response) {
            if (err) {
                console.log(">>>>>>>>>>", err)
                callback(err, null)
            } else {
                console.log(">>>>>>>>>response", response)
                callback(null, response)
            }
        });

    },
    sendMailWithTemplate: async (to, otp) => {
        try {
            const msg = {
                to: to,
                from: 'no-replymailer@mobiloitte.com', // Use the email address or domain you verified above
                subject: 'Your Account verification',
                html: `<!DOCTYPE HTML
                PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
            <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml"
                xmlns:o="urn:schemas-microsoft-com:office:office">
            
            <head>
                <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <meta name="x-apple-disable-message-reformatting">
                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                <title></title>
            
                <style type="text/css">
                    @media only screen and (min-width: 620px) {
                        .u-row {
                            width: 600px !important;
                        }
            
                        .u-row .u-col {
                            vertical-align: top;
                        }
            
                        .u-row .u-col-100 {
                            width: 600px !important;
                        }
            
                    }
            
                    @media (max-width: 620px) {
                        .u-row-container {
                            max-width: 100% !important;
                            padding-left: 0px !important;
                            padding-right: 0px !important;
                        }
            
                        .u-row .u-col {
                            min-width: 320px !important;
                            max-width: 100% !important;
                            display: block !important;
                        }
            
                        .u-row {
                            width: calc(100% - 40px) !important;
                        }
            
                        .u-col {
                            width: 100% !important;
                        }
            
                        .u-col>div {
                            margin: 0 auto;
                        }
                    }
            
                    body {
                        margin: 0;
                        padding: 0;
                    }
            
                    table,
                    tr,
                    td {
                        vertical-align: top;
                        border-collapse: collapse;
                    }
            
                    p {
                        margin: 0;
                    }
            
                    .ie-container table,
                    .mso-container table {
                        table-layout: fixed;
                    }
            
                    * {
                        line-height: inherit;
                    }
            
                    a[x-apple-data-detectors='true'] {
                        color: inherit !important;
                        text-decoration: none !important;
                    }
            
                    table,
                    td {
                        color: #000000;
                    }
            
                    a {
                        color: #0000ee;
                        text-decoration: underline;
                    }
            
                    @media (max-width: 480px) {
                        #u_content_image_1 .v-container-padding-padding {
                            padding: 25px 10px 10px !important;
                        }
            
                        #u_content_image_1 .v-src-width {
                            width: auto !important;
                        }
            
                        #u_content_image_1 .v-src-max-width {
                            max-width: 32% !important;
                        }
            
                        #u_content_image_1 .v-text-align {
                            text-align: center !important;
                        }
            
                        #u_content_heading_2 .v-container-padding-padding {
                            padding: 15px 30px !important;
                        }
            
                        #u_content_heading_2 .v-font-size {
                            font-size: 18px !important;
                        }
            
                        #u_content_heading_2 .v-text-align {
                            text-align: center !important;
                        }
            
                        #u_content_heading_2 .v-line-height {
                            line-height: 130% !important;
                        }
            
                        #u_content_image_2 .v-container-padding-padding {
                            padding: 10px !important;
                        }
            
                        #u_content_image_2 .v-src-width {
                            width: auto !important;
                        }
            
                        #u_content_image_2 .v-src-max-width {
                            max-width: 24% !important;
                        }
            
                        #u_column_5 .v-col-background-color {
                            background-color: #e8fce5 !important;
                        }
            
                        #u_content_text_1 .v-container-padding-padding {
                            padding: 40px 15px 70px 20px !important;
                        }
            
                        #u_column_4 .v-col-background-color {
                            background-color: #242526 !important;
                        }
            
                        #u_content_heading_3 .v-container-padding-padding {
                            padding: 15px 15px 20px !important;
                        }
            
                        #u_content_heading_3 .v-font-size {
                            font-size: 15px !important;
                        }
            
                        #u_content_social_1 .v-container-padding-padding {
                            padding: 15px 10px 20px !important;
                        }
                    }
                </style>
            
            
            
                <!--[if !mso]><!-->
                <link href="https://fonts.googleapis.com/css?family=Montserrat:400,700&display=swap" rel="stylesheet"
                    type="text/css">
                <!--<![endif]-->
            
            </head>
            
            <body class="clean-body u_body"
                style="margin: 0;padding: 0;-webkit-text-size-adjust: 100%;background-color: #ffffff;color: #000000">
                <table
                    style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;min-width: 320px;Margin: 0 auto;background-color: #ffffff;width:100%"
                    cellpadding="0" cellspacing="0">
                    <tbody>
                        <tr style="vertical-align: top;background-color: #e9e9e9;">
                            <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
                                <div class="u-row-container" style="padding: 0px;background-color: transparent">
                                    <div class="u-row"
                                        style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #bfedd2;">
                                        <div
                                            style="border-collapse: collapse;display: table;width: 100%;background-color: transparent;">
                                            <div class="u-col u-col-100"
                                                style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
                                                <div class="v-col-background-color"
                                                    style="background-color: #242526;width: 100% !important;">
                                                    <div
                                                        style="padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">
            
                                                        <table id="u_content_image_1"
                                                            style="font-family:arial,helvetica,sans-serif;" role="presentation"
                                                            cellpadding="0" cellspacing="0" width="100%" border="0">
                                                            <tbody>
                                                                <tr>
                                                                    <td class="v-container-padding-padding"
                                                                        style="overflow-wrap:break-word;word-break:break-word;padding:22px;font-family:arial,helvetica,sans-serif;"
                                                                        align="left">
            
                                                                        <table width="100%" cellpadding="0" cellspacing="0"
                                                                            border="0">
                                                                            <tr>
                                                                                <td class="v-text-align"
                                                                                    style="padding-right: 0px;padding-left: 0px;"
                                                                                    align="center">
                                                                                    <a href="https://social-platform.mobiloitte.org/"
                                                                                        target="_blank">
                                                                                        <img align="center" border="0"
                                                                                            src="https://res.cloudinary.com/mobiloittetech/image/upload/v1659360423/yl4afsk4ymiyizscazlx.png"
                                                                                            alt="Logo" title="Logo"
                                                                                            style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: inline-block !important;border: none;height: auto;float: none;width: 100%;max-width: 176px;"
                                                                                            width="176"
                                                                                            class="v-src-width v-src-max-width" />
                                                                                    </a>
                                                                                </td>
                                                                            </tr>
                                                                        </table>
            
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
            
                                <div class="u-row-container" style="padding: 0px;background-color: transparent">
                                    <div class="u-row"
                                        style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #ffffff;">
                                        <div
                                            style="border-collapse: collapse;display: table;width: 100%;background-color: transparent;">
                                            <div class="u-col u-col-100"
                                                style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
                                                <div class="v-col-background-color"
                                                    style="width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
                                                    <div
                                                        style="padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
                                                        <!--<![endif]-->
                                                        <br />
                                                        <table id="u_content_image_2"
                                                            style="font-family:arial,helvetica,sans-serif;" role="presentation"
                                                            cellpadding="0" cellspacing="0" width="100%" border="0">
                                                            <tbody>
                                                                <tr>
                                                                    <td class="v-container-padding-padding"
                                                                        style="overflow-wrap:break-word;word-break:break-word;padding:0px;font-family:arial,helvetica,sans-serif;"
                                                                        align="left">
            
                                                                        <table width="100%" cellpadding="0" cellspacing="0"
                                                                            border="0">
                                                                            <tr>
                                                                                <td class="v-text-align"
                                                                                    style="padding-right: 0px;padding-left: 0px;"
                                                                                    align="center">
            
                                                                                    <img align="center" border="0" 
                                                                                        src="https://res.cloudinary.com/no-vipin/image/upload/v1650948223/unnamed_1_zhoami.png"
                                                                                        alt="Hero Image" title="Hero Image"
                                                                                        style="background-color: #242526; outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: inline-block !important;border: none;height: auto;float: none;width: 20%;max-width: 120px;"
                                                                                        width="120"
                                                                                        class="v-src-width v-src-max-width" />
            
                                                                                </td>
                                                                            </tr>
                                                                        </table>
            
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
            
                                                        <table id="u_content_heading_2"
                                                            style="font-family:arial,helvetica,sans-serif;" role="presentation"
                                                            cellpadding="0" cellspacing="0" width="100%" border="0">
                                                            <tbody>
                                                                <tr>
                                                                    <td class="v-container-padding-padding"
                                                                        style="overflow-wrap:break-word;word-break:break-word;padding:30px 20px;font-family:arial,helvetica,sans-serif;"
                                                                        align="left">
            
                                                                        <h3 class="v-text-align v-line-height v-font-size"
                                                                            style="margin: 0px; color: #2f3448; line-height: 130%; text-align: center; word-wrap: break-word; font-weight: normal; font-family: 'Montserrat',sans-serif; font-size: 18px;">
                                                                            <strong>Verify Your Email Address</strong>
                                                                        </h3>
            
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
            
            
            
                                <div class="u-row-container" style="padding: 0px;background-color: transparent">
                                    <div class="u-row"
                                        style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #ddf2fe;">
                                        <div
                                            style="border-collapse: collapse;display: table;width: 100%;background-color: transparent;">
                                            <div id="u_column_5" class="u-col u-col-100"
                                                style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
                                                <div class="v-col-background-color"
                                                    style="background-color: #e8fce5;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
                                                    <!--[if (!mso)&(!IE)]><!-->
                                                    <div
                                                        style="padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
                                                        <!--<![endif]-->
            
                                                        <table id="u_content_text_1" style="font-family:arial,helvetica,sans-serif;"
                                                            role="presentation" cellpadding="0" cellspacing="0" width="100%"
                                                            border="0">
                                                            <tbody>
                                                                <tr>
                                                                    <td class="v-container-padding-padding"
                                                                        style="overflow-wrap:break-word;word-break:break-word;padding:44px 55px 70px;font-family:arial,helvetica,sans-serif;"
                                                                        align="left">
            
                                                                        <div class="v-text-align v-line-height"
                                                                            style="color: #536475; line-height: 180%; text-align: left; word-wrap: break-word;">
                                                                            <p
                                                                                style="text-align: center; font-size: 14px; line-height: 180%;">
                                                                                <span
                                                                                    style="color: #000000; font-size: 14px; line-height: 25.2px;">Use
                                                                                    this confirmation
                                                                                    code:</span>
                                                                            </p>
                                                                            <p
                                                                                style="text-align: center; font-size: 14px; line-height: 180%;">
                                                                                <span
                                                                                    style="font-size: 18px; line-height: 32.4px; color: #242526;"><strong>${otp}</strong></span>
                                                                            </p>
                                                                            <p
                                                                                style="text-align: center; font-size: 14px; line-height: 180%;">
                                                                                <span
                                                                                    style="color: #000000; font-size: 14px; line-height: 25.2px;">This
                                                                                    one-time code is
                                                                                    valid for 5 minutes </span>
                                                                            </p>
                                                                        </div>
            
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
            
                                <div class="u-row-container" style="padding: 0px;background-color: transparent">
                                    <div class="u-row"
                                        style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #489066;">
                                        <div
                                            style="border-collapse: collapse;display: table;width: 100%;background-color: transparent;">
                                            <div id="u_column_4" class="u-col u-col-100"
                                                style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
                                                <div class="v-col-background-color"
                                                    style="background-color: #242526;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
                                                    <!--[if (!mso)&(!IE)]><!-->
                                                    <div
                                                        style="padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
                                                        <!--<![endif]-->
            
                                                        <table id="u_content_heading_3"
                                                            style="font-family:arial,helvetica,sans-serif;" role="presentation"
                                                            cellpadding="0" cellspacing="0" width="100%" border="0">
                                                            <tbody>
                                                                <tr>
                                                                    <td class="v-container-padding-padding"
                                                                        style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;"
                                                                        align="left">
            
                                                                        <h4 class="v-text-align v-line-height v-font-size"
                                                                            style="margin: 0px; color: #ffffff; line-height: 120%; text-align: center; word-wrap: break-word; font-weight: normal; font-family: trebuchet ms,geneva; font-size: 16px;">
                                                                            If you do not recognize this activity, immediately
                                                                            contact us.
                                                                        </h4>
            
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
            
                                                        <table id="u_content_social_1"
                                                            style="font-family:arial,helvetica,sans-serif;" role="presentation"
                                                            cellpadding="0" cellspacing="0" width="100%" border="0">
                                                            <tbody>
                                                                <tr>
                                                                    <td class="v-container-padding-padding"
                                                                        style="overflow-wrap:break-word;word-break:break-word;padding:15px 10px 20px;font-family:arial,helvetica,sans-serif;"
                                                                        align="left">
            
                                                                        <div align="center">
                                                                            <div style="display: table; max-width:187px;">
                                                                                <table align="left" border="0" cellspacing="0"
                                                                                    cellpadding="0" width="32" height="32"
                                                                                    style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;margin-right: 15px">
                                                                                    <tbody>
                                                                                        <tr style="vertical-align: top">
                                                                                            <td align="left" valign="middle"
                                                                                                style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
                                                                                                <a href="https://instagram.com/"
                                                                                                    title="Instagram"
                                                                                                    target="_blank">
                                                                                                    <img src="https://res.cloudinary.com/no-vipin/image/upload/v1649400675/image-3_gw0zsp.png"
                                                                                                        alt="Instagram"
                                                                                                        title="Instagram" width="32"
                                                                                                        style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: block !important;border: none;height: auto;float: none;max-width: 32px !important">
                                                                                                </a>
                                                                                            </td>
                                                                                        </tr>
                                                                                    </tbody>
                                                                                </table>
                                                                                <table align="left" border="0" cellspacing="0"
                                                                                    cellpadding="0" width="32" height="32"
                                                                                    style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;margin-right: 15px">
                                                                                    <tbody>
                                                                                        <tr style="vertical-align: top">
                                                                                            <td align="left" valign="middle"
                                                                                                style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
                                                                                                <a href="https://facebook.com/"
                                                                                                    title="Facebook"
                                                                                                    target="_blank">
                                                                                                    <img src="https://res.cloudinary.com/no-vipin/image/upload/v1649400675/image-1_bwcj5s.png"
                                                                                                        alt="Facebook"
                                                                                                        title="Facebook" width="32"
                                                                                                        style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: block !important;border: none;height: auto;float: none;max-width: 32px !important">
                                                                                                </a>
                                                                                            </td>
                                                                                        </tr>
                                                                                    </tbody>
                                                                                </table>
                                                                                <table align="left" border="0" cellspacing="0"
                                                                                    cellpadding="0" width="32" height="32"
                                                                                    style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;margin-right: 15px">
                                                                                    <tbody>
                                                                                        <tr style="vertical-align: top">
                                                                                            <td align="left" valign="middle"
                                                                                                style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
                                                                                                <a href="https://twitter.com/"
                                                                                                    title="Twitter" target="_blank">
                                                                                                    <img src="https://res.cloudinary.com/no-vipin/image/upload/v1649400675/image-2_jfvzle.png"
                                                                                                        alt="Twitter"
                                                                                                        title="Twitter" width="32"
                                                                                                        style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: block !important;border: none;height: auto;float: none;max-width: 32px !important">
                                                                                                </a>
                                                                                            </td>
                                                                                        </tr>
                                                                                    </tbody>
                                                                                </table>
                                                                                <table align="left" border="0" cellspacing="0"
                                                                                    cellpadding="0" width="32" height="32"
                                                                                    style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;margin-right: 0px">
                                                                                    <tbody>
                                                                                        <tr style="vertical-align: top">
                                                                                            <td align="left" valign="middle"
                                                                                                style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
                                                                                                <a href="https://linkedin.com/"
                                                                                                    title="LinkedIn"
                                                                                                    target="_blank">
                                                                                                    <img src="https://res.cloudinary.com/no-vipin/image/upload/v1649400675/image-4_weii1w.png"
                                                                                                        alt="LinkedIn"
                                                                                                        title="LinkedIn" width="32"
                                                                                                        style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: block !important;border: none;height: auto;float: none;max-width: 32px !important">
                                                                                                </a>
                                                                                            </td>
                                                                                        </tr>
                                                                                    </tbody>
                                                                                </table>
                                                                            </div>
                                                                        </div>
            
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
            
                                <div class="u-row-container" style="padding: 0px;background-color: transparent">
                                    <div class="u-row"
                                        style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
                                        <div
                                            style="border-collapse: collapse;display: table;width: 100%;background-color: transparent;">
                                            <div class="u-col u-col-100"
                                                style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
                                                <div
                                                    style="width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
                                                    <!--[if (!mso)&(!IE)]><!-->
                                                    <div
                                                        style="padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
                                                        <!--<![endif]-->
            
                                                        <table style="font-family:arial,helvetica,sans-serif;" role="presentation"
                                                            cellpadding="0" cellspacing="0" width="100%" border="0">
                                                            <tbody>
                                                                <tr>
                                                                    <td style="overflow-wrap:break-word;word-break:break-word;padding:0px;font-family:arial,helvetica,sans-serif;"
                                                                        align="left">
            
                                                                        <table width="100%" cellpadding="0" cellspacing="0"
                                                                            border="0">
                                                                            <tr>
                                                                                <td style="padding-right: 0px;padding-left: 0px;"
                                                                                    align="center">
            
                                                                                    <img align="center" border="0"
                                                                                        src="https://res.cloudinary.com/no-vipin/image/upload/v1649400676/image-6_jmvlg7.png"
                                                                                        alt="Shadow" title="Shadow"
                                                                                        style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: inline-block !important;border: none;height: auto;float: none;width: 100%;max-width: 600px;"
                                                                                        width="600" />
            
                                                                                </td>
                                                                            </tr>
                                                                        </table>
            
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </body>
            
            </html>`
            };
            return await sgMail.send(msg);
        } catch (error) {
            console.log("error ==>>>", error);
            throw error;
        }

    },

}
function ab2hexstring() {
    let arr = ["A", "S", "D", "F", "G", "H", "J", "K", "L", "Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "Z", "X", "C", "V", "B", "N", "M", "8", "7", "4", "5", "6", "0", "1", "3", "2", "9"];
    let result = ""
    for (let i = 0; i < arr.length; i++) {
        let str = arr[i].toString(16);
        str = str.length === 0 ? "00" : str.length === 1 ? str : str
        result += str
    }
    return result
}

