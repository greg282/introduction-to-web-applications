import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree ,Router} from '@angular/router';
import { Observable ,map} from 'rxjs';
import { FirebaseServiceService } from '../services/firebase-service.service';
import { getAuth,onAuthStateChanged} from "firebase/auth";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor( public fire: FirebaseServiceService, public router: Router )
  { }
  canActivate( next: ActivatedRouteSnapshot, state: RouterStateSnapshot):
 Observable<boolean> | Promise<boolean> | boolean {

  return this.fire.getAuthenticated().pipe(
    map((state) => {
      if (state == null) {
        this.router.navigate(['login']);
        return false;
      }
      return true;
    })
  );
 }

}
