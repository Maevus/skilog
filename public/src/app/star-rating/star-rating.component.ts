import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DEFAULT_STARS } from '../const';

@Component({
  selector: 'app-star-rating',
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.scss']
})
export class StarRatingComponent implements OnInit {

  @Output() starRatingEvent = new EventEmitter<number>();

  stars = [
    {
      id: 1,
      icon: 'star',
      class: 'star-gray star-hover star'
    },
    {
      id: 2,
      icon: 'star',
      class: 'star-gray star-hover star'
    },
    {
      id: 3,
      icon: 'star',
      class: 'star-gray star-hover star'
    },
    {
      id: 4,
      icon: 'star',
      class: 'star-gray star-hover star'
    },
    {
      id: 5,
      icon: 'star',
      class: 'star-gray star-hover star'
    }

  ];

  constructor() { }

  ngOnInit(): void { 
    this.selectStar(DEFAULT_STARS);
  }

  selectStar(value: number): void {
    this.stars.filter((star) => {
      if (star.id <= value) {
        star.class = 'star-color star';
      } else {
        star.class = 'star-gray star';
      }
      return star;
    });
    
    this.starRatingEvent.emit(value);

  }
}
