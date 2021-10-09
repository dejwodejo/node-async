import Express from 'express';
import { IApp, IMailController } from './interfaces';

class App implements IApp{
    public app: Express.Application;
    public port: number;

    constructor(port: number, controller: IMailController) {
        this.app = Express();
        this.port = port;

        this.initializeMiddlewares();
        this.initializeController(controller);
    };

    initializeController(controller: IMailController) {
        this.app.use('/', controller.router)
    };

    initializeMiddlewares() {
        this.app.use(Express.json());
        this.app.use(Express.urlencoded({ extended: true }));
    };

    public listen() {
        this.app.listen(this.port, () => {
            console.log(`App is now listening on port ${this.port}...`)
        });
    };
};

export default App;