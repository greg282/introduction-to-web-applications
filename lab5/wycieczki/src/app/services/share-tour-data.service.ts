import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ShareTourDataService {
  databaseShare= new EventEmitter();
  constructor() { }
}
