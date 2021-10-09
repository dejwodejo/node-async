import fs from 'fs';
import fetch from "node-fetch";
import queryString from 'query-string';

class BookDataHandler{
  urlForFetchingBooks: string;
  constructor(private fetchHandler: IGoogleBookFetcher = new FetchWrapper(), private fileHandler: IFileManager = new FileManager(), private dataOrganiser: IDataOrganiser = new DataOrganiser()){
    this.urlForFetchingBooks = "https://www.googleapis.com/books/v1/volumes";
  };
 
  public async getData(bookName: string) {
    if(bookName.length === 0) throw new Error('bookName string is empty');

    if (this.fileHandler.isFileStored(bookName)) { return this.fileHandler.readFile(bookName); };

    const apiUrlWithInputQuery = queryString.stringifyUrl({url: this.urlForFetchingBooks, query: {q: `${bookName}`}});
    const dataFromGoogle: BooksFromGoogleAPI = await this.fetchHandler.getBookByName(apiUrlWithInputQuery);

    const output = this.dataOrganiser.arrangeSettledKeysAndProperies(dataFromGoogle);

    this.fileHandler.writeFile(output, bookName);

    return output;
  };
};

//====================================================================================

interface IGoogleBookFetcher{
  getBookByName(url:string) : Promise<any>,
};

class FetchWrapper implements IGoogleBookFetcher{
  public async getBookByName(url: string) {
      const result = await fetch(url);
      return await result.json();
  } 
};

//====================================================================================

interface IDataOrganiser{
  arrangeSettledKeysAndProperies(data: BooksFromGoogleAPI): Book[];
};

class BooksFromGoogleAPI{
  kind!: string;
  totalItems!: number;
  items!: [];
};

class DataOrganiser implements IDataOrganiser{
  public arrangeSettledKeysAndProperies(data: BooksFromGoogleAPI){
    return data.items.reduce((acc: Book[], currItem: any) => {
      const bookData = {
        id: currItem.id,
        title: currItem.volumeInfo.title,
        author: currItem.volumeInfo.author,
        language: currItem.volumeInfo.language,
      }
      
      acc.push(bookData);
      console.log(acc);
      return acc;
    },[]);
  };
};

//====================================================================================

interface IFileManager{
  writeFile(data: Book[], query: string): void,
  readFile(bookName: string): Buffer,
  isFileStored(bookName: string): boolean,
};

class FileManager implements IFileManager{

  public writeFile(data: Book[], query: string) {
    try {
      if(query.length === 0) throw new Error('bookName string is empty');

      const dataString = JSON.stringify(data);
      fs.writeFileSync(`${query}.json`, dataString)
    } catch (error) {throw new Error(error)}
  };

  public readFile(bookName: string){
    try{
      if(bookName.length === 0) throw new Error('bookName string is empty');

      const data = fs.readFileSync(`./${bookName}.json`);
      console.log(data);
      return data;
    } catch(err) {throw new Error(err)}
  };

  public isFileStored(bookName: string){
    try {
      if(bookName.length === 0) throw new Error('bookName string is empty');
      
      const result = fs.existsSync(`${bookName}.json`)

      return result;
    } catch (error) { throw new Error(error)}
  };
};

//====================================================================================

interface Book {
  id: string;
  title: string;
  author: string;
  language: string;
};