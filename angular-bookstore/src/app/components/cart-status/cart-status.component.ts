import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CartItem } from 'src/app/common/cart-item';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart-status',
  templateUrl: './cart-status.component.html',
  styleUrls: ['./cart-status.component.css']
})
export class CartStatusComponent implements OnInit {


  totalPrice:number = this._cartService.getPriceFormLocal;
  totalQuantity:number = this._cartService.getQtyFormLocal;
 

  constructor(private _cartService : CartService) { }

  ngOnInit(): void {    
    this.updateCartStatus();
  }

  updateCartStatus(){
    // subscribe to the events
    this._cartService.totalPrice.subscribe(
      data => this.totalPrice = data
    )

    this._cartService.totalQuantity.subscribe(
      data => this.totalQuantity = data
    )
    


  }

}
