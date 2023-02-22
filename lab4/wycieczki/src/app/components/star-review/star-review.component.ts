import { Component, OnInit, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';


@Component({
  selector: 'app-star-review',
  templateUrl: './star-review.component.html',
  styleUrls: ['./star-review.component.css']
})
export class StarReviewComponent {
  @Input('rating')  rating: number = 0;
  @Input('starCount')  starCount: number = 5;
  @Input('color')  color: string = 'accent';
  @Output()  ratingUpdated = new EventEmitter();

  private snackBarDuration: number = 2000;
  public ratingArr :number[]= [];
  private avgRating=0;
  constructor() {
  }


  ngOnInit() {
    for (let index = 0; index < this.starCount; index++) {
      this.ratingArr.push(index);
    }
  }
  onClick(rating:number) {
    //console.log(rating)

    if(this.avgRating!=0){
      this.avgRating+=rating;
      this.avgRating=this.avgRating/2;
    }
    else{
      this.avgRating+=rating;
    }
    this.rating=this.avgRating;
    this.ratingUpdated.emit(rating);
    return false;
  }

  showIcon(index:number) {
    if (this.rating >= index + 1) {
      return 'star';
    } else {
      return 'star_border';
    }
  }

}

