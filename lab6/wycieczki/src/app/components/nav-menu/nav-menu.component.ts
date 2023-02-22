import { Component } from '@angular/core';
import { faCartShopping,faHome } from '@fortawesome/free-solid-svg-icons';
import {AddToCartService} from '../../services/add-to-cart.service'
import { FirebaseServiceService } from 'src/app/services/firebase-service.service';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent {
  showCart_bool:boolean=false;
  faCartShopping = faCartShopping;
  faHome = faHome;
  tour_counter:any=0
  constructor(private service:AddToCartService,public fire:FirebaseServiceService) {

  }


  ngOnInit(){
    this.service.tourCounterUpdater.subscribe(data =>this.tour_counter=data);

  }
  showCart(){
    this.showCart_bool=!this.showCart_bool;
  }
  logout(){
    this.fire.signOut();
  }
}
