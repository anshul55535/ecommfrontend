import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-seller-prod',
  templateUrl: './seller-prod.component.html',
  styleUrls: ['./seller-prod.component.css'],
})
export class SellerProdComponent {
  products: any= [];
  isseller: any;
  userdata: any;
  cartuser: string = '';
  qty: number = 1;

  currentPage: number = 1;
  pageSize: number = 8;
  totalProducts: number = 0;

  searchcat: any;
  allcategories: any;
  searchtext: any;
  constructor(private us: UserService, private router: Router) {}

  ngOnInit(): void {
    this.us.message$.subscribe((res) => {
      this.userdata = jwt_decode(res);
      this.isseller = this.userdata.user.isSeller;
      this.cartuser = this.userdata.user.email;
    });

    this.us.getcategory().subscribe((data: any) => {
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
    });

    this.us.getallsellerproducts().subscribe((res) => {
      const data: any = res;
      this.products = data['product'];
      this.totalProducts = this.products.length;
      this.products.forEach((data: any) => (data.qty = 1));
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
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    return this.products.slice(
      startIndex,
      endIndex > this.totalProducts ? this.totalProducts : endIndex
    );
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
      this.us.getallsellerproducts().subscribe((data:any) => {
        if (data['success'] ) {  // Check if 'product' array is defined
          this.products = data['product'];
          this.totalProducts = this.products.length;
          this.products.forEach((data: any) => (data.qty = 1));
          this.us.success(data['message']);
          this.searchcat= '';
        } else {
          this.totalProducts = 0; // Set totalProducts as 0
          this.us.error(data['message']);
        }
      });
    }
  }


  searchcategory() {
    if (this.searchcat) {
      this.us.sellersearchcategory(this.searchcat).subscribe((data: any) => {
        if (data['success']) {
          this.us.success('Product Found')
          this.products = data['products'];
          this.searchtext = '';

          this.products.forEach((data: any) => (data.qty = 1));
        } else {
          this.us.error(data['message']);
          this.searchcat = '';
          this.searchtext = '';
        }
      });
    }
  }
}
