import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  searchcat: string | undefined;
  searchtext: string = '';
  products: any= [];
  isseller: any;
  userdata: any;
  cartuser: string = '';
  qty: number = 1;

  currentPage: number = 1;
  pageSize: number = 8;
  totalProducts: number = 0;
  allcategories: any;

  constructor(private us: UserService, private router: Router) {}

  ngOnInit(): void
{
    this.category();
    this.user();
    this.getproducts();
  }

  category() {
    this.us.getcategory().subscribe((data: any) => {
      if (data['success']) {
        this.allcategories = data['categories'];
      } else {
        this.us.error(data['message']);
      }
    });
  }

  user() {
    this.us.message$.subscribe((res) => {
      this.userdata = jwt_decode(res);
      this.isseller = this.userdata.user.isSeller;
      this.cartuser = this.userdata.user.email;
    });
  }

  getproducts() {
    this.us.getallproducts().subscribe((res) => {
      const data: any = res;
      if (data['success']) {
        this.products = data['product'];
        this.totalProducts = this.products.length;
        this.products.forEach((data: any) => (data.qty = 1));
      } else {
        this.us.error(data['message']);
      }
    });
  }

  cart(item: any) {
    if (item.user) {
      const status = this.us.addToCart(item);

      this.us.success('added to cart sucessfully');
    } else {
      this.us.error('Please login to add to cart');
      this.router.navigate(['/']);
    }
  }

  // getPaginatedProducts() {
  //   if (this.products) {
  //     const startIndex = (this.currentPage - 1) * this.pageSize;
  //     const endIndex = startIndex + this.pageSize;
  //     return this.products.slice(
  //       startIndex,
  //       endIndex > this.totalProducts ? this.totalProducts : endIndex
  //     );
  //   }
  //   return;
  // }


  search() {
    if (this.searchtext) {
      this.us.getsearch(this.searchtext).subscribe((data: any) => {
        if (data['success']) {

          this.products = data['products'];
          this.us.success(data['message']);

          this.totalProducts = this.products.length;
          this.products.forEach((data: any) => (data.qty = 1));
          this.searchtext = '';
        } else {
          this.products = ''
          this.us.error(data['message']);
        }
      });
    } else {
      this.us.getallproducts().subscribe((data:any) => {
        if (data['success'] ) {  // Check if 'product' array is defined
          this.products = data['product'];
          this.totalProducts = this.products.length;
          this.products.forEach((data: any) => (data.qty = 1));
          this.us.success(data['message']);
          this.searchtext = '';
        } else {
          this.totalProducts = 0; // Set totalProducts as 0
          this.us.error(data['message']);
        }
      });
    }
  }
  searchcategory() {
    if (this.searchcat) {
      this.us.searchcategory(this.searchcat).subscribe((data: any) => {
        if (data['success']) {
          this.us.success('message');

          this.products = data['products'];

          this.products.forEach((data: any) => (data.qty = 1));
        } else {
          this.us.error(data['message']);
          this.searchcat = '';
        }
      });
    }
  }
}
