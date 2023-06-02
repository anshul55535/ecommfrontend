import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';
import jwt_decode from 'jwt-decode';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-prod-details',
  templateUrl: './prod-details.component.html',
  styleUrls: ['./prod-details.component.css'],
})
export class ProdDetailsComponent implements OnInit  {
  product: any;
  isseller: any;
  userdata: any;
  qty: number = 1;
  cartuser: string = '';

  reviewtitle: string = '';
  reviewdescription: string = '';
  reviewrating: number = 1;
  islogin:boolean =false

  public addtocart = new Subject();
  avgrating: number=0;
  subtotal: number =0;

  constructor(
    private us: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {}




  ngOnInit() {
    this.us.message$.subscribe((res) => {
      this.userdata = jwt_decode(res);
      this.isseller = this.userdata.user.isSeller;
      this.cartuser = this.userdata.user.email;
      this.islogin = true
    });



    this.route.params.subscribe((params) => {
      const id = params['id'];



      this.us.prod_detail(id).subscribe((res) => {
        const data: any = res;
        this.product = data['product'];
        this.xyz()
        this.product.qty = 1;
      });
    });
  }

  cart(item: any) {
    if (item.user) {
      const status = this.us.addToCart(item);

      this.us.success('added to cart sucessfully');
      // this.router.navigate(['/']);
    } else {
      this.us.error('Please login to add to cart');
      // this.router.navigate(['/']);
    }
  }

  review() {
    if (!this.reviewtitle || !this.reviewdescription || !this.reviewrating) {
    this.us.error('Invalid form data: All fields are required.')
    return;
  }

  // Create a new FormData object and append the field values
  const reviewData = {
    title: this.reviewtitle,
    description: this.reviewdescription,
    rating: this.reviewrating,
    productid:this.product._id
  };

  this.us.addreview(reviewData).subscribe((data:any) => {





    this.route.params.subscribe((params) => {
      const id = params['id'];



      this.us.prod_detail(id).subscribe((res) => {
        const data: any = res;
        this.product = data['product'];
        this.product.reviews.reverse()
        this.xyz()
        this.product.qty = 1;
      });
    });


    this.us.success(data['message']);

    // Further processing if needed
  });
  }




  xyz(){



    this.product.reviews.forEach((data: any) => {
      this.subtotal += data.rating ;

  })
  this.avgrating = this.subtotal
  this.subtotal = 0
}


}
