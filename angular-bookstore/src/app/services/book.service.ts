import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Book } from '../common/book';
import { BookCategory } from '../common/book-category';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private baseUrl = "http://localhost:8080/api/v1/books";
  private categoryUrl = "http://localhost:8080/api/v1/book-category";
  constructor(private httpClient: HttpClient) { }
  
  getBooks(theCategoryId:number, currentPage: number, pageSize: number):Observable<GetResponseBooks>{
    const searchUrl = `${this.baseUrl}/search/categoryid?id=${theCategoryId}&page=${currentPage}&size=${pageSize}`;
    return this.httpClient.get<GetResponseBooks>(searchUrl)
  }
  
  getBookById(bookId:number): Observable<Book>{
    const bookDetailUrl = `${this.baseUrl}/${bookId}`;
    return this.httpClient.get<Book>(bookDetailUrl);
  }

  getBookCategories():Observable<BookCategory[]>{
    return this.httpClient.get<GetResponseBookCategory>(this.categoryUrl).pipe(
      map(response => response._embedded.bookCategory)
      );
    }
    
    searchBooks(keyword:string, currentPage: number, pageSize: number):Observable<GetResponseBooks>{
      const searchUrl = `${this.baseUrl}/search/searchByKeyword?name=${keyword}&page=${currentPage}&size=${pageSize}`;
      return this.httpClient.get<GetResponseBooks>(searchUrl);
    }
    
    
    // private getBookList(searchUrl: string): Observable<Book[]> {
    //   return this.httpClient.get<GetResponseBooks>(searchUrl).pipe(
    //     map(response => response._embedded.books)
    //   );
    // }



}

interface GetResponseBooks{
  _embedded:{
    books: Book[];
  },
  page:{
    // total number of records in each page
    size: number,
    // total number of records in the database
    totalElements: number,
    //total number of pages, start form 0 index
    totalPages: number,
    // current page
    number: number
  }
}

interface GetResponseBookCategory{
  _embedded:{
    bookCategory: BookCategory[];
  }
}
