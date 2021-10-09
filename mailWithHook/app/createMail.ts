import { ICreateMail } from './interfaces';
import QueryString from 'qs';

class CreateMail implements ICreateMail{
    public firstMail(requestEmail: string){
         return {
            from: `'Dawid App' <hookMail@app.pl>`,
            to: `${requestEmail}`,
            subject: `Welcom to the jungle`,
            text: `MESsAGE`,
            html: `<a href= "http://localhost:3000/resend-mail?emailToSend=${requestEmail}">RESEND</a>`
        };
    };

    public secondMail(email: string | QueryString.ParsedQs | string[] | QueryString.ParsedQs[]){//wiadomosc z linku
        return {
            from: `'Dawid App' <hookMail@app.pl>`,
            to: `${email}`,
            subject: `JUNGLE FREQUENT USER CART `,
            text: `</3`,
            html: `<h1> AMAZING MONKE JUNGLE </h1>`
        };
    };
};

export default CreateMail;