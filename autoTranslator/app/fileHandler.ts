import fs from 'fs';
import { IFileHandler } from './interfaces';
import path from 'path';

export default class FileHandler implements IFileHandler {
    constructor(private readonly pathToTranslations: string = '../tranlations'){}
    
    public writeFile<T>(data: T, translationLanguage: string): void{
        if(translationLanguage.length === 0) throw new Error('translationLanguage is empty');
        
        const dataString = JSON.stringify(data);
        fs.writeFileSync(path.resolve(this.pathToTranslations, `${translationLanguage}.json`), dataString);
    };

    public readFile<T>(translationLanguage: string): T{
        if(translationLanguage.length === 0) throw new Error('translationLanguage is empty');

        const translation =  fs.readFileSync(path.resolve(this.pathToTranslations, `${translationLanguage}.json`));
        return JSON.parse(translation.toString())
    };

    public isFileStored(translationLanguage: string){
        if(translationLanguage.length === 0) throw new Error('translationLanguage is empty');

        return fs.existsSync(`${translationLanguage}.json`);
    };
};