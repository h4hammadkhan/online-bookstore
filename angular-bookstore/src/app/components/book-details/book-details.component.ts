import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Book } from 'src/app/common/book';
import { CartItem } from 'src/app/common/cart-item';
import { BookService } from 'src/app/services/book.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./Book-details.component.css']
})
export class BookDetailsComponent implements OnInit {

  book: Book = new Book();

  constructor(private activatedRoute: ActivatedRoute,
              private bookService: BookService,
              private _cartService: CartService) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(
      () =>{
        this.getBookInfo();
      }
    )
  }

  getBookInfo(){

    const id = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.bookService.getBookById(id).subscribe(
      data=>{
        // console.log(data);
        this.book = data;
        
      }
    )
  }

  addToCart(){
    const cartItem = new CartItem(this.book);
    this._cartService.addToCart(cartItem);
  }

}
