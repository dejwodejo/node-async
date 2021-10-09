import { Router } from "express";

interface IApp{
    app: Express.Application;
    readonly port: number;

    listen(): void;
};
interface IController{
    readonly router: Router;

    initializeRoutes(): void;
};
interface ITranslationWithCacheCoordinator{
    performTranslationAndFileActions(language: string): Promise<{}>;
    setStrategy(strategy: ITranslationStrategy): void;
};
interface ITranslationStrategy{
    handleTranslationOperation<T>(translationTarget: T, language: string): Promise<{}>;
};
interface IFileHandler{ 
    writeFile(data: Object, translationLanguage: string): void;
    readFile<T>(translationLanguage: string): T;
    isFileStored(translationLanguage: string): boolean;
};  
interface ICredentials{
    type: string;
    project_id: string;
    private_key_id: string;
    private_key: string;
    client_email: string;
    client_id: string;
    auth_uri: string;
    token_uri: string;
    auth_provider_x509_cert_url: string;
    client_x509_cert_url: string;
};
interface IApiInfo{
    key: string;
    url: string;
}
interface IGoogleTranslator {
    translate(phraseToTranslate: string, lang: string) : Promise<string>;
};
interface IAccumulator{
    objectKeyAccumulator: string[];
    values: string[];
};
interface IInformationsForTranslatedTarget{
    objectKeyAccumulator: string[];
    arrOfTranslatedObjValues: string[];
    arrOfSpecialKeyValues: string[];
}

export { IApp, IController, ITranslationWithCacheCoordinator, ITranslationStrategy, IFileHandler, ICredentials,
        IApiInfo, IGoogleTranslator, IAccumulator, IInformationsForTranslatedTarget}