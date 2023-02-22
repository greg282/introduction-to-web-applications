import { Component } from '@angular/core';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import {AddToCartService} from '../../services/add-to-cart.service'


@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent {
  showCart_bool:boolean=false;
  faCartShopping = faCartShopping;
  tour_counter:any=0;
  constructor(private service:AddToCartService) {

  }


  ngOnInit(){
    this.service.tourCounterUpdater.subscribe(data =>this.tour_counter=data );
  }
  showCart(){
    this.showCart_bool=!this.showCart_bool;
  }
}
