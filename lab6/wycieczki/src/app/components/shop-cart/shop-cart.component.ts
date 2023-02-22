import { Component } from '@angular/core';
import {AddToCartService} from '../../services/add-to-cart.service'



@Component({
  selector: 'app-shop-cart',
  templateUrl: './shop-cart.component.html',
  styleUrls: ['./shop-cart.component.css']
})
export class ShopCartComponent {

  info:string="";
  positions_in_cart:Array<any>=[];
  curr_price:number=0;

  constructor(private service:AddToCartService){

  }
  ngOnInit(){

    this.service.tourAdded.subscribe(
      (tour:any) => {
        this.updatePositionInCart(tour,tour.counter);
      }
    )
    this.service.tourReturned.subscribe(
      (tour:any) =>{
        this.updatePositionInCart(tour,tour.counter);
      }
    )
    this.service.clearTour.subscribe(
      () =>{
        this.deleteAll();
      }
    )

  }

  deleteAll(){
      this.info="";
      this.positions_in_cart=[];
      this.curr_price=0;
  }

  updatePositionInCart(tour:any,change:number){
    if(change==0){
      return;
    }

    let was_in_cart:boolean=false;
    let index_to_del:any=null;

    this.positions_in_cart.map(function(element:any,index:any){
      if(element.id==tour.id){
        was_in_cart=true;
        element.counter+=change;
      }
      if(element.counter==0){
       index_to_del=index;
      }
    })
    if(!was_in_cart){
      this.positions_in_cart.push(tour);
    }
    if(index_to_del!=null){
      this.positions_in_cart.splice(index_to_del,1);
    }
    this.sumPositions();
   this.service.state$.next(this.positions_in_cart);
  }

  sumPositions(){
    this.curr_price=0;
    this.positions_in_cart.forEach((element)=>{
      this.curr_price+=(element.price*element.counter)
    })
  }

}
