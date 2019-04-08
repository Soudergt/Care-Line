import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'app-star-rating',
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.scss']
})
export class StarRatingComponent implements OnInit {
  @Input() rating: number;
  @Input() edit: boolean;
  @Output() ratingClick: EventEmitter<any> = new EventEmitter<any>();

  inputName: string;

  constructor() { }

  ngOnInit() {
    this.inputName = 'rating';
  }
  
  onClick(rating: number): void {
    this.rating = rating;
    this.ratingClick.emit(rating);
  }

}
