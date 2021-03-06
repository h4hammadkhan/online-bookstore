import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { CartItem } from '../common/cart-item';

@Injectable({
  providedIn: 'root'
})
export class CartService {

cartItems: CartItem[] = [];
totalPrice: Subject<number> = new Subject<number>();
totalQuantity: Subject<number> = new Subject<number>();


getPriceFormLocal: number = 0;
getQtyFormLocal: number = 0;

constructor() { }
getData(){
  const item = JSON.parse(localStorage.getItem('item')!);
  const price = JSON.parse(localStorage.getItem('Price')!);
  const qty = JSON.parse(localStorage.getItem('Qty')!);
  if(item){
    item.forEach((element: CartItem) => {
      if((this.cartItems.find(currentItem => currentItem.id === element.id))){

      }
      else{
        this.cartItems.push(element);
        this.getPriceFormLocal = price;
        this.getQtyFormLocal = qty;
      }
    });
  }
  // this.cartItems.push(this.cartItemsLocal)
  console.log(this.cartItems);
  
  return this.cartItems;
}

addToCart(theCartItem: CartItem){
  // check whether book/item is already in the cart
  let alreadyExistsInCart: boolean = false;
  let existingCartItem: CartItem | undefined;

  if(this.cartItems.length > 0){
    // find the book/item in the cart based on the id
    existingCartItem = this.cartItems.find(tempCartItem => tempCartItem.id === theCartItem.id);
    alreadyExistsInCart = (existingCartItem != undefined)
  }

  if(alreadyExistsInCart){
    // increment the quantity
    if(existingCartItem!.quantity < theCartItem.unitInStock){

      existingCartItem!.quantity++;
    }
  }else{
    // add to the cart item array
    this.cartItems.push(theCartItem);
    // set to the local storage
    
  }
  
  this.calculateTotalPrice();
  localStorage.setItem('item',JSON.stringify(this.cartItems));  

}
  calculateTotalPrice() {
    let totalPriceValue: number = 0;
    let totalQuantityValue: number = 0;

    // calculate total price and total quantity 
    for(let currentCartItem of this.cartItems){
      totalPriceValue += currentCartItem.quantity * currentCartItem.unitPrice;
      totalQuantityValue += currentCartItem.quantity;
    }

    // console.log(`total price: ${totalPriceValue}, total quantity: ${totalQuantityValue}`);
    
    // publish the events
    this.totalPrice.next(totalPriceValue);
    localStorage.setItem('Price',JSON.stringify(totalPriceValue));
    this.totalQuantity.next(totalQuantityValue);
    localStorage.setItem('Qty',JSON.stringify(totalQuantityValue));

  }

  decrementQty(cartItem: CartItem) {
    cartItem.quantity--;

    if(cartItem.quantity === 0){
      this.remove(cartItem);

    }    
    else{
      this.calculateTotalPrice();
      localStorage.setItem('item',JSON.stringify(this.cartItems));

    }

  }

  remove(cartItem:CartItem){
    const itemIndex = this.cartItems.findIndex(tempCartItem => tempCartItem.id === cartItem.id);
    
  
    if(itemIndex > -1){
      this.cartItems.splice(itemIndex,1);
      // localStorage.clear();
      this.calculateTotalPrice();
      // console.log(itemIndex);
      // remove from local storage
      localStorage.setItem('item',JSON.stringify(this.cartItems));
      
         
    }

  }

}
