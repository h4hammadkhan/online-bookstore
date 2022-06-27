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
  
  getBooks(theCategoryId:number):Observable<Book[]>{
    const searchUrl = `${this.baseUrl}/search/categoryid?id=${theCategoryId}`;
    return this.getBookList(searchUrl);
  }
  
  getBookCategories():Observable<BookCategory[]>{
    return this.httpClient.get<GetResponseBookCategory>(this.categoryUrl).pipe(
      map(response => response._embedded.bookCategory)
      );
    }
    
    searchBooks(keyword:string):Observable<Book[]>{
      const searchUrl = `${this.baseUrl}/search/searchByKeyword?name=${keyword}`;
      return this.getBookList(searchUrl);
    }
    
    
    private getBookList(searchUrl: string): Observable<Book[]> {
      return this.httpClient.get<GetResponseBooks>(searchUrl).pipe(
        map(response => response._embedded.books)
      );
    }



}

interface GetResponseBooks{
  _embedded:{
    books: Book[];
  }
}

interface GetResponseBookCategory{
  _embedded:{
    bookCategory: BookCategory[];
  }
}
