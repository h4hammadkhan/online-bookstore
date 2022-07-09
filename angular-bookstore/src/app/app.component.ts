import { Component } from '@angular/core';
import { Book } from './common/book';
import { CartItem } from './common/cart-item';
import { CartService } from './services/cart.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

constructor(private cartService: CartService){
  this.cartService.getData();


}

}
