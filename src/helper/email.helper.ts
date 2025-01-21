
import nodemailer from 'nodemailer';
import path from 'path';
import handlebars from 'handlebars';
import { readHTMLFile } from './common';
const sendEmail = async function (to: any, subject: any, template: any, from = global.config.FROM_EMAIL) {
    try {
        let transporter = null;
        if (typeof global.config.IS_EMAIL_USE_SMTP !== 'undefined' && global.config.IS_EMAIL_USE_SMTP == 'on') {
            transporter = nodemailer.createTransport({
                host: global.config.EMAIL_HOST,
                port: global.config.EMAIL_PORT,
                secure: (global.config.EMAIL_PORT == 465) ? true : false,
                auth: {
                    user: global.config.FROM_EMAIL,
                    pass: global.config.EMAIL_PASSWORD
                }
            });
        } else {
            transporter = nodemailer.createTransport({
                host: 'smtp.ethereal.email',
                port: 587,
                auth: {
                    user: 'alexis.volkman@ethereal.email',
                    pass: 'W7223Tq2TrwtxE2ftr'
                }
            });
        }

        let mailOptions = {
            from: from,
            to: to,
            subject: subject,
            html: template
        }
        if (to && to != '') {
            return await transporter.sendMail(mailOptions,
                (error: any, info: any) => {
                    if (error) {
                        console.log('\n if Email fail ==> ', error);
                    } else {
                        console.log("info", info)
                    }
                }
            );
        } else {
            return;
        }

    } catch (e) {
        console.log('\nEmail failed catch ==> ', e)
        const templateData = { message: e ? e : '' }
    }
}

const emailSender = (to: string, subject: string, data: any, template: any) => {
    readHTMLFile(path.join(__dirname, `../../src/email_templates/${template}.html`), async function (err: any, html: any) {
        try {
            const compiledTemplate = handlebars.compile(html);
            const htmlToSend = compiledTemplate(data);
            await sendEmail(to, subject, htmlToSend)
        } catch (e) {
            console.log("error", e)
        }
    })
}


export { emailSender }