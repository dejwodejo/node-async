import { IMailHandler, IMailOptions, IMailMessage } from './interfaces';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import nodemailer from 'nodemailer';

class MailHandler implements IMailHandler{
    mailOptions: IMailOptions;
    transporter: nodemailer.Transporter<SMTPTransport.SentMessageInfo>;

    constructor(){
        this.mailOptions = {
            host: 'smtp.ethereal.email',
            port: 587,
            secure: false,
            auth: {
                user: 'myra.zboncak@ethereal.email',
                pass: 'HUpTbrJyb8vasc9RBJ'
            }
        };
        this.transporter = nodemailer.createTransport(this.mailOptions);
    };

    public sendMail(mailMessage: IMailMessage){
       return this.transporter.sendMail(mailMessage);//dlaczego mimo await nie czekał na wykonanie - na spokojnie :)
    };
};

export default MailHandler;