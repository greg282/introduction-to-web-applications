import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StateServicerService {
  state$ = new BehaviorSubject<any>(null);


  constructor() { }
}
