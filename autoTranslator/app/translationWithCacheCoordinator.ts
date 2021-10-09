import FileHandler from "./fileHandler";
import { ITranslationStrategy, IFileHandler, ITranslationWithCacheCoordinator } from "./interfaces";

export default class TranslationWithCacheCoordinator implements ITranslationWithCacheCoordinator{
    private standardLanguageToTranslateFrom: string;

    constructor(private strategy: ITranslationStrategy, private readonly fileHandler: IFileHandler = new FileHandler()){
        this.standardLanguageToTranslateFrom = 'pl';
    };

    public async performTranslationAndFileActions(language: string): Promise<{}>{
        if(this.fileHandler.isFileStored(language)) {
            try{
                return this.fileHandler.readFile(language);
            }
            catch(exception) {
                console.error(exception);
            };
        };

        const objectToTranslate = this.fileHandler.readFile(this.standardLanguageToTranslateFrom);
        const translatedObject = await this.strategy.handleTranslationOperation(objectToTranslate, language);
        
        try{
            this.fileHandler.writeFile(translatedObject, language);
        } catch(exception) {
            console.error(exception);
        };

        return translatedObject;
    };

    public setStrategy(strategy: ITranslationStrategy){
        this.strategy = strategy;
    };
};