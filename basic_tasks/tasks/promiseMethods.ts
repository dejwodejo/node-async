export {promiseAll, promiseRace, promiseLast, promiseIgnoreErrors}

//==================================================================================================================
const promiseAll = async <T>(arrayOfPromise: Promise<T>[]): Promise<T[]> => {
    const resolveValueArray: Array<T> = [];

    for(const promise of arrayOfPromise){
        try {
            const promiseResult = await promise
            resolveValueArray.push(promiseResult);
        } catch (error) {
            console.error(`promiseAll throws an error: ${error}`);
            break;
        }
    }
    return resolveValueArray;
}

const promis1= Promise.resolve(false);

const promis2 = Promise.resolve(29);

const promis3 = new Promise ((resolve, reject) => {
    setTimeout(resolve, 2000, 'WHYD');
});

promiseAll([promis1, promis2, promis3]).then(result => console.log(result, 'ALL'));
//==================================================================================================================

const promiseRace = <T>(arrayOfPromise: Promise<T>[]): Promise<T> => {
    return new Promise((resolve, reject) => {
        arrayOfPromise.forEach(prom => prom.then(res => resolve(res)).catch(err => console.error(err)))
    });
}

const pr1= new Promise ((resolve, reject) => {
    setTimeout(resolve, 3000, true);
});

const pr2 = new Promise ((resolve, reject) => {
    setTimeout(resolve, 2000, 5521123);
});

const pr3 = new Promise ((resolve, reject) => {
    setTimeout(resolve, 5000, 'surtdf');
});

promiseRace([pr1, pr2, pr3]).then(result => console.log(result, 'RACE'));

//==================================================================================================================

const promiseLast =async <T>(arrayOfPromise: Promise<T>[]) => {
    // return new Promise((resolve, reject) => {
    //     arrayOfPromise.forEach(prom => prom.then(res => resolve(res)).catch(err => console.error(err)))
    // });
}

const pre1= new Promise ((resolve, reject) => {
    setTimeout(resolve, 3000, true);
});

const pre2 = new Promise ((resolve, reject) => {
    setTimeout(resolve, 2000, 5521123);
});

const pre3 = new Promise ((resolve, reject) => {
    setTimeout(resolve, 5000, 'surtdf');
});

promiseLast([pre1,pre2,pre3]).then(result => console.log(result, 'LAST'));

//==================================================================================================================
const promiseIgnoreErrors = async <T>(arrayOfPromise: Promise<T>[]) => {
    const resolveValueArray: Array<T> = []

    for(const promise of arrayOfPromise){
        try{
            resolveValueArray.push(await promise);
        } catch (err) {
            continue;
        }
    }
    return resolveValueArray;
}

const p1= new Promise ((resolve, reject) => {
    setTimeout(reject, 3000, false);
});

const p2 = new Promise ((resolve, reject) => {
    setTimeout(resolve, 2000, 234);
});

const p3 = new Promise ((resolve, reject) => {
    setTimeout(resolve, 5000, 'WHYD');
});

promiseIgnoreErrors([p1,p2,p3]).then(result => console.log(result, 'IGNORE-ERRORS'))