import Express, { Router } from 'express';
import nodemailer from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import QueryString from 'qs';


interface IApp {
    app: Express.Application;
    port: number;

    initializeController(controller: IMailController): void;
    initializeMiddlewares(): void;
    listen(): void;
};

interface IMailController {
    router: Router;
    
    initializeRoutes(): void;
    enterMail(req: Express.Request, res: Express.Response): void;
    sendMail(req: Express.Request, res: Express.Response): void;
    resendMail(req: Express.Request, res: Express.Response): void;
};

interface IMailHandler {
    mailOptions: IMailOptions;
    transporter: nodemailer.Transporter<SMTPTransport.SentMessageInfo>;

    sendMail(mailMessage: IMailMessage): Promise<SMTPTransport.SentMessageInfo>;
};

interface ICreateMail {
    firstMail(requestEmail: string): IMailMessage;
    secondMail(email: string | QueryString.ParsedQs | string[] | QueryString.ParsedQs[]): IMailMessage;
};

interface IMailMessage {
    from: string,
    to: string, 
    subject: string,
    text: string, 
    html: string
};

interface IMailOptions {
    host: string,
    port: number, 
    secure: boolean,
    auth: {
        user: string,
        pass: string
    }
};

export { IApp, IMailController, IMailHandler, ICreateMail, IMailMessage, IMailOptions };