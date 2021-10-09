import express, { Application } from 'express';
import { IApp, IController } from './interfaces';

class App implements IApp{ 
    public app: Application;
    public port: number;

    constructor(port: number, controllers: Array<IController>) {
        this.app = express();
        this.port = port;

        this.initializeMiddlewares();
        this.initializeControllers(controllers);
    };

    private initializeControllers(controllers: Array<IController>) {
        controllers.forEach(controller => this.app.use('/', controller.router))
    };

    private initializeMiddlewares() {
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
    };

    public listen() {
        this.app.listen(this.port, () => {
            console.log(`App is now listening on port ${this.port}...`)
        });
    };
};

export default App;