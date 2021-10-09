import { ITranslationStrategy, IAccumulator, IInformationsForTranslatedTarget } from "./interfaces";

export default abstract class TranslationHandler implements ITranslationStrategy {
    public async handleTranslationOperation<T>(translationTarget: T, language: string): Promise<{}>{
        const copiedTranslationTarget = this.prepareObjCopy(translationTarget);
        const { objectKeyAccumulator, values } = this.recursivelyGetObjValuesAndKeys(copiedTranslationTarget);

        const arrOfTranslatedObjValues: string[] = await this.translateText(values, language);

        const infoForCreatingTranslatedTarget = {
            objectKeyAccumulator: objectKeyAccumulator,
            arrOfTranslatedObjValues: arrOfTranslatedObjValues,
            arrOfSpecialKeyValues: [language]
        };

        this.assignTranslatedObjValuesAndHandleSpecialObjKeys(copiedTranslationTarget, infoForCreatingTranslatedTarget);

        return copiedTranslationTarget;
    };

    protected abstract translateText(valuesToTranslate: string[], language: string): Promise<string[]>;

    protected prepareObjCopy<T>(translationTarget: T){
        const copiedTranslationTarget = {};
        Object.assign(copiedTranslationTarget, translationTarget);
        return copiedTranslationTarget;
    };

    protected recursivelyGetObjValuesAndKeys<T>(recursionTarget: T, accumulator: IAccumulator = { objectKeyAccumulator:[], values:[] }, passObjKey: string = null): IAccumulator{
        Object.entries(recursionTarget).forEach(([key, value]) => {
            if(this.isLiteralObject(value)){
                if(passObjKey !== null) {
                    key = passObjKey + `.${key}`; //inaczej nie wywołuje rekurencji
                }
                this.recursivelyGetObjValuesAndKeys(value, accumulator, key);
            } else if(typeof value === 'string') {
                accumulator.objectKeyAccumulator.push(passObjKey + `.${key}`);
                accumulator.values.push(value);
            };
        });

        return accumulator;
    };

    protected assignTranslatedObjValuesAndHandleSpecialObjKeys<T>(translationTarget: T, informationsForTranslatedTarget: IInformationsForTranslatedTarget): void{
        informationsForTranslatedTarget.objectKeyAccumulator.forEach((keyMap, idx) => {
            const keyArr = keyMap.split('.');
            const translation = informationsForTranslatedTarget.arrOfTranslatedObjValues[idx];

            this.recursivelyChangeObjValue(translationTarget, keyArr, translation);
            this.handleSpecialObjKeys(translationTarget, keyArr, informationsForTranslatedTarget.arrOfSpecialKeyValues);
        });
    };

    protected recursivelyChangeObjValue<T>(recursionTarget: T, arrKeyMap: string[], translation: string): void{
        const copiedArrKeyMap = [...arrKeyMap];
        copiedArrKeyMap.forEach((key: string) => {
            
            if(typeof recursionTarget[key] === 'string'){
                recursionTarget[key] = translation;
                return
            };

            if(this.isLiteralObject(recursionTarget[key])){
                copiedArrKeyMap.shift();
                this.recursivelyChangeObjValue(recursionTarget[key], copiedArrKeyMap, translation);
            };
        });
    };

    protected handleSpecialObjKeys<T>(translationTarget: T, keyArr: string[], arrWithValues: string[]): void{
        const arrOfSpecialObjKeys = ['action'];//zadeklarowane w klasie

        keyArr.forEach(key => {
            if(arrOfSpecialObjKeys.includes(key)){
                this.recursivelyChangeObjValue(translationTarget, keyArr, `/new-subscriber?lang=${arrWithValues[0]}`);
            };
        });
    };

    protected isLiteralObject(a: any): boolean{
        return (!!a) && (a.constructor === Object);
    };
};