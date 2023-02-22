import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddToCartService {
  tourAdded = new EventEmitter();
  tourReturned = new EventEmitter();
  tourCounterUpdater=new EventEmitter();
  clearTour=new EventEmitter();
  constructor() { }
  state$ = new BehaviorSubject<any>(null);

}
