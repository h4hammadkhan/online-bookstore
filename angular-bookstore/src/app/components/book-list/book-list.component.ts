import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Book } from 'src/app/common/book';
import { BookService } from 'src/app/services/book.service';
import { NgbPaginationConfig } from '@ng-bootstrap/ng-bootstrap';
import { CartService } from 'src/app/services/cart.service';
import { CartItem } from 'src/app/common/cart-item';
import { NgxSpinnerService } from 'ngx-spinner';
import { CartStatusComponent } from '../cart-status/cart-status.component';

@Component({
  selector: 'app-book-list',
  // templateUrl: './book-list.component.html',
  templateUrl: './book-grid.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {

  books: Book[] = [];
  currentCategoryId: number = 1;
  searchMode: boolean = false;

  // new properties for server side paging
  currentPage: number = 1; // ng-bootstrap current page start form 1 index
  pageSize: number = 5;
  totalRecords: number = 0;

  previousCategoryId: number = 1;




  constructor(private _bookService: BookService, 
              private _activatedRoute: ActivatedRoute,
              _config: NgbPaginationConfig,
              private _cartService: CartService,
              private _spinnerService: NgxSpinnerService) {
               
                _config.maxSize = 3; // add max size to the ng pagination
                _config.boundaryLinks = true; // first and last page links in pagination 
   }

  ngOnInit(): void {
    this._activatedRoute.paramMap.subscribe(() => {
      this.listBooks();
    });



  }


  updatePageSize(pageSize: number) {
    this.pageSize = pageSize;
    this.currentPage = 1;
    this.listBooks();
  }


  listBooks() {
    // start the loader/spinner 
    this._spinnerService.show();

    this.searchMode = this._activatedRoute.snapshot.paramMap.has('keyword');

    if (this.searchMode) {
      // do search work
      this.handleSearchBooks();
    }
    else {
      // display books based on category
      this.handleListBooks();
      localStorage.getItem('item');
    }

  }

  handleListBooks() {
    const hasCategoryId: boolean = this._activatedRoute.snapshot.paramMap.has('id');

    if (hasCategoryId) {
      this.currentCategoryId = Number(this._activatedRoute.snapshot.paramMap.get('id'));
    }
    else {
      this.currentCategoryId = 1;
    }

    // setting up the current page to 1
    // if the user navigate to other category
    if (this.previousCategoryId != this.currentCategoryId) {
      this.currentPage = 1;
    }

    this.previousCategoryId = this.currentCategoryId;


    this._bookService.getBooks(this.currentCategoryId, this.currentPage - 1, this.pageSize).subscribe(
      // this.processPaginate() 
      data => {
          this._spinnerService.hide();
          this.books = data._embedded.books;
          // page number starts from 1 index
          this.currentPage = data.page.number + 1;
          this.totalRecords = data.page.totalElements;
          this.pageSize = data.page.size;
          // console.log(data); 


      }
    )
  }


  handleSearchBooks() {
    const keyword: string = this._activatedRoute.snapshot.paramMap.get('keyword')!;
    this._bookService.searchBooks(keyword,  this.currentPage - 1, this.pageSize).subscribe(
        this.processPaginate()
    ) 
  }

  // fetching data to the server
  processPaginate() {
    return (
      data: { 
        _embedded: { books: Book[]; }; 
        page: { number: number; totalElements: number; size: number; }; 
      }
      ) => {
            // stop the spinner/loader
          this._spinnerService.hide();
          this.books = data._embedded.books;
          // page number starts from 1 index
          this.currentPage = data.page.number + 1;
          this.totalRecords = data.page.totalElements;
          this.pageSize = data.page.size;
      
    }
  }

  addToCart(book: Book){
    // console.log(`book name: ${book.name} and book price: ${book.unitPrice}`);
    
    const cartItem = new CartItem(book);
    this._cartService.addToCart(cartItem);
  }

}

