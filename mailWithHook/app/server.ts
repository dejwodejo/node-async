import App from './app';
import MailController from './mail.controller';

const mailController = new MailController();
const app = new App(3000, mailController);

app.listen()