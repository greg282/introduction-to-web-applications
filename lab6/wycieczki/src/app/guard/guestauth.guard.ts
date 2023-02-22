import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree ,Router} from '@angular/router';
import { Observable,map } from 'rxjs';
import { FirebaseServiceService } from '../services/firebase-service.service';

@Injectable({
  providedIn: 'root'
})
export class GuestauthGuard implements CanActivate {
  constructor( public fire: FirebaseServiceService, public router: Router )
  { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(this.fire.userState.getValue()==null){
          this.router.navigate(['tourlist'])
      }
      return this.fire.userState.getValue().client.booleanValue || this.fire.userState.getValue().menager.booleanValue || this.fire.userState.getValue().admin.booleanValue;
  }

}
