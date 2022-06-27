import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor(private router:Router, private bookService: BookService) { }

  ngOnInit(): void {

  }

  searchBooks(keyword:string){
    // console.log(keyword);
    this.router.navigateByUrl(`/search/${keyword}`);
  }

}
