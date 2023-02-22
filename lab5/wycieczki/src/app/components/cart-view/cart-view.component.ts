import { Component } from '@angular/core';
import { AddToCartService } from 'src/app/services/add-to-cart.service';
@Component({
  selector: 'app-cart-view',
  templateUrl: './cart-view.component.html',
  styleUrls: ['./cart-view.component.css']
})
export class CartViewComponent {
  positions_in_cart:Array<any>=[];
  curr_price:number=0;

  constructor(private service:AddToCartService){

  }

  ngOnInit(){
    if(this.service.state$.getValue()!=null){
      this.positions_in_cart=this.service.state$.getValue();
      this.sumPositions();
    }
  }
  sumPositions(){
    this.curr_price=0;
    this.positions_in_cart.forEach((element)=>{
      this.curr_price+=(element.price*element.counter)
    })
  }
}
