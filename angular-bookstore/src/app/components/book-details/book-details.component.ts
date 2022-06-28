import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Book } from 'src/app/common/book';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./Book-details.component.css']
})
export class BookDetailsComponent implements OnInit {

  book: Book = new Book();

  constructor(private activatedRoute: ActivatedRoute,
              private bookService: BookService) { }

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

}
