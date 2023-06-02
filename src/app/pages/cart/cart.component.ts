import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';
import jwt_decode from 'jwt-decode';
import { Order } from 'src/app/order';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  cart: any;
  totalPrice = 0;
  userdata: any;
  currentuser: any;
  isseller: any;
  cartuser: any;
  itemsarray: Array<any> = [];
  order: Array<any> = [];

  constructor(private us: UserService, private router: Router) {
    this.us.message$.subscribe((res) => {
      this.userdata = jwt_decode(res);
      this.currentuser = this.userdata.user._id;
    });


  }
  ngOnInit(): void {
    this.us.cartdata.subscribe((data)=>{
      const mycart:any = data
    this.cart = JSON.parse(mycart)
    if(this.cart){
      this.cart.forEach((data: any) => {
        const subtotal = data.qty * data.id.price;
        this.totalPrice += subtotal;
      });
    }else{
      this.totalPrice =0
    }

    })


  }



  checkout(cart: any) {
    if (cart) {
      cart.forEach((data: any) => {
        // this.order.owner = this.currentuser
        // this.order.totalPrice = this.totalPrice

        const orderitems: object = {
          product: data.id._id,
          quantity: data.qty,
        };
        this.itemsarray.push(orderitems);

      });

      this.order.push(this.currentuser);
      this.order.push(this.itemsarray);
      this.order.push(this.totalPrice);

      this.us.orders(this.order).subscribe((data) => {
        this.us.cartSource.next(localStorage.setItem('cart','[]'))
        this.totalPrice =0

        this.us.success('Your Order has been Placed');
        this.router.navigateByUrl('/');

        //     setTimeout(() => {
        //       // Clear the alert message after 3 seconds
        // this.router.navigateByUrl('/myorders')
        //     }, 1000);
      });
    }
  }



  deletecartitem(product:any){

   const res =  this.us.removeFromCart(product)


   if(res){

    this.totalPrice = 0

    this.us.cartSource.next(localStorage.getItem('cart'))
   this.us.success(res)
   this.router.navigateByUrl('/cart')
  }
   else{
    this.us.error('try again')
   }


  }
}
