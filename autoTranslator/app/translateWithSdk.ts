import TranslationHandler from "./abstractTranslationHandler";
import { ICredentials, IGoogleTranslator } from "./interfaces";
const { Translate } = require('@google-cloud/translate').v2;
require('dotenv').config();

export default class TranslateWithSdk extends TranslationHandler {
    private readonly CREDENTIALS: ICredentials;
    private readonly googleTranslator: IGoogleTranslator;

    constructor(){
        super();
        this.CREDENTIALS = JSON.parse(process.env['CREDENTIALS']);
        this.googleTranslator = new Translate({
            credentials: this.CREDENTIALS,
            projectId: this.CREDENTIALS.project_id
        });
    };

    protected async translateText(valuesToTranslate: string[], language: string): Promise<string[]>{
        const stringPreparedToTranslation = valuesToTranslate.join('\n');
        const translatedString = await this.googleTranslator.translate(stringPreparedToTranslation, language);
        const arrOfTranslatedObjValues = translatedString[0].split('\n');
        return arrOfTranslatedObjValues;
    };
};