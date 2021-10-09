import Express from 'express';
import CreateMail from './createMail';
import MailHandler from './mailHandler';
import { ICreateMail, IMailController, IMailHandler } from './interfaces';

class MailController implements IMailController{
    private mailHandler: IMailHandler;
    private createMail: ICreateMail;

    constructor(public router = Express.Router(), mailHandler: IMailHandler = new MailHandler(), createMail = new CreateMail()){
        this.mailHandler = mailHandler;
        this.createMail = createMail;

        this.initializeRoutes();
    };

    public initializeRoutes() {
        this.router.get('/enter-mail', this.enterMail);
        this.router.post('/send-mail', this.sendMail);
        this.router.get('/resend-mail', this.resendMail);
    };

    enterMail = (req: Express.Request, res: Express.Response) => { //arrow functions because they access properties of an instance of the class
        res.send(`
        <form action= "http://localhost:3000/send-mail" method="post">
        email: <input type='text' name='email'>
        <input type='submit' value='submit'>`);
    };

    sendMail = async (req: Express.Request, res: Express.Response) => {
        try{
            const emailToSend = this.createMail.firstMail(req.body.email);
            await this.mailHandler.sendMail(emailToSend);
        } catch(err) {
            return res.json(err.message);
        }
        return res.json("mail sent");
    };

    resendMail = async (req: Express.Request, res: Express.Response) => {
        try{
            const emailToSend = req.query.emailToSend;
            await this.mailHandler.sendMail(this.createMail.secondMail(emailToSend));
        } catch(err) {
            return res.json(err.message).send();
        }
        return res.json("mail sent");
    };
};

export default MailController;