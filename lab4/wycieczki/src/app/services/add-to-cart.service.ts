import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AddToCartService {
  tourAdded = new EventEmitter();
  tourReturned = new EventEmitter();
  constructor() { }
}
