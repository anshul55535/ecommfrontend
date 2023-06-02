import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-star-rating',
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.css']
})
export class StarRatingComponent {
  @Input() rating: number =4;
  @Input() maxRating: number = 5;

  getStars(): number[] {
    return Array(this.maxRating).fill(0).map((_, index) => index + 1);
  }

  rate(stars: number) {
    this.rating = stars;
  }
}
