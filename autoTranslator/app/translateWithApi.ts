import axios from 'axios';
import qs from 'querystring';
require('dotenv').config();

import TranslationHandler from './abstractTranslationHandler';

import { IApiInfo } from './interfaces';

export default class TranslateWithApi extends TranslationHandler {
    private readonly API_INFO: IApiInfo;

    constructor(){
        super();
        this.API_INFO = JSON.parse(process.env['API_INFO']);
    };

    protected async translateText(valuesToTranslate: string[], language: string): Promise<string[]>{
        const googleApiResponse = await axios.post(this.API_INFO.url, qs.stringify({q: valuesToTranslate, target: language, key: this.API_INFO.key}));
        const translationsArray = [];
        googleApiResponse.data.data.translations.forEach((translation: { translatedText: string, detectedSourceLanguage: string }) => translationsArray.push(translation.translatedText));
        return translationsArray;
    };
};
