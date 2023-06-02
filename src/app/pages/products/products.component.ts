import { Component, OnInit, Input } from '@angular/core';
import { Subject } from 'rxjs';
import { UserService } from 'src/app/service/user.service';
import jwt_decode from 'jwt-decode';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  @Input() products: any = [];
  @Input() isseller: any;
  @Input() userdata: any;
  @Input() cartuser: string = '';


  @Input() currentPage: number = 1;
  pageSize: number = 8;
  @Input() totalProducts: number = 0;

  @Input() searchcat: any;
  @Input() allcategories: any;
  @Input() searchtext: string ='';
  avgrating: any;
  subtotal: any;
  product: any;
  constructor(private us: UserService, private router: Router) {}

  ngOnInit(): void {
    this.us.message$.subscribe((res) => {
      this.userdata = jwt_decode(res);
      this.isseller = this.userdata.user.isSeller;
      this.cartuser = this.userdata.user.email;
    });

    this.us.getcategory().subscribe((data: any) => {
      if (data['success']) {
        this.allcategories = data['categories'];
        this.allcategories.sort((a: { name: string }, b: { name: string }) => {
          const nameA = a.name.toUpperCase();
          const nameB = b.name.toUpperCase();
          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }
          return 0;
        });
      } else {
        this.us.error(data['message']);
      }
    });

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

  getPaginatedProducts(): any[] {
    if (this.products) {
      const startIndex = (this.currentPage - 1) * this.pageSize;
      const endIndex = startIndex + this.pageSize;
      return this.products.slice(
        startIndex,
        endIndex > this.totalProducts ? this.totalProducts : endIndex
      );
    }
    return [];
  }


  search() {
    if (this.searchtext) {
      this.us.getsearch(this.searchtext).subscribe((data: any) => {
        if (data['success']) {

          this.products = data['products'];
          this.us.success(data['message']);

          this.totalProducts = this.products.length;
          this.products.forEach((data: any) => (data.qty = 1));
          this.searchcat = '';
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
          this.searchcat = '';
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
          this.us.success(data['message']);

          this.products = data['products'];

          this.products.forEach((data: any) => (data.qty = 1));
          this.searchtext = ''
        } else {
          this.us.error(data['message']);
          this.searchcat = '';
        }
      });
    }
  }


  xyz(){

    this.us.getreview().subscribe((data:any)=>{
    })


}




}
