import { Request, Response, Router } from 'express';
import { IController, ITranslationWithCacheCoordinator } from './interfaces';
import TranslateWithApi from './translateWithApi';
import TranslateWithSdk from './translateWithSdk';
import TranslationWithCacheCoordinator from './translationWithCacheCoordinator';

export default class TranslationController implements IController {
    constructor(public router = Router(), private readonly translationAndFileHandlerCoordinator: ITranslationWithCacheCoordinator  = new TranslationWithCacheCoordinator(new TranslateWithApi())){
        this.initializeRoutes();
    };

    public initializeRoutes() {
        this.router.post('/translate-object', this.translateObjToRequestedLanguage);
    }

    private translateObjToRequestedLanguage = async (req: Request<{},{}, {language: string}>, res: Response) => {
        try{
            const { language } = req.body;

            const translatedObj = await this.translationAndFileHandlerCoordinator.performTranslationAndFileActions(language);

            console.log(translatedObj);
            return res.status(200).json(translatedObj);
        } catch(err) {
            return res.json(err.message);
        };
    };
};