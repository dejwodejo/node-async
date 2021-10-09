function recursivePromise <T>(arrayOfPromises: Promise<T>[]){ 
    const resultsArr: T[] = []
    
    function handleRecursivePromise (arrayOfPromises: Promise<T>[], arrayOfResults: T[], promiseIdx: number = 0){
        if(arrayOfPromises.length < 7) throw new Error('Array is too short');

        arrayOfPromises[promiseIdx].then(value => {
            arrayOfResults.push(value);
            console.log(arrayOfResults);

            promiseIdx = promiseIdx + 1;
            if(promiseIdx === arrayOfPromises.length) return arrayOfResults;
        
            handleRecursivePromise(arrayOfPromises, resultsArr, promiseIdx)
        }).catch(err => {
            console.error(`Promise rejected: ${err}`);
            return arrayOfResults;
        })
    }

    handleRecursivePromise(arrayOfPromises, resultsArr);
    return resultsArr;
}

//================================================================================================

const promise1 = new Promise ((resolve, reject) => {
    setTimeout(resolve, 3000, false);
});

const promise2 = new Promise ((resolve, reject) => {
    setTimeout(resolve, 2000, []);
});

const promise3 = new Promise ((resolve, reject) => {
    setTimeout(resolve, 1500, {});
});

const promise4 = new Promise ((resolve, reject) => {
    setTimeout(resolve, 500, 3333333333);
});

const promise5 = new Promise ((resolve, reject) => {
    setTimeout(resolve, 2423, 'stringattack');
});

const promise6 = new Promise ((resolve, reject) => {
    setTimeout(resolve, 2000, true);
});

const promise7 = new Promise ((resolve, reject) => {
    setTimeout(resolve, 5000, 53543);
}); 

const promise8 = new Promise ((resolve, reject) => {
    setTimeout(resolve, 1000, 'stringattack again');
}); 

recursivePromise([promise1, promise2, promise3, promise4, promise5, promise6, promise7, promise8]);