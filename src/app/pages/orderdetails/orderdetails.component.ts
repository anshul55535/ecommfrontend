import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-orderdetails',
  templateUrl: './orderdetails.component.html',
  styleUrls: ['./orderdetails.component.css']
})
export class OrderdetailsComponent implements OnInit {
  activatedRoute: any;
  orderId: string = '';
  products: any;
  totalAmount: any;
  orderby: any;


  constructor(private us: UserService, private route: ActivatedRoute,private router:Router) {}


  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.orderId = params['id']; // Perform null check before accessing properties
        this.getProducts();

    });

  }





  getProducts(){
    this.us.getordersbyid(this.orderId).subscribe((data: any) => {

      if(data['success']){

        this.products = data['order'].products
      this.totalAmount = data['order'].totalPrice
      this.orderby = data['order'].owner

      }else{
        this.us.error(data['message'])
      }







    })}

    deleteorder(){
      this.us.deleteordersbyid(this.orderId).subscribe((data:any)=>{
        if(data['success']){
          this.us.success(data['message'])
          this.router.navigateByUrl('/myorders')

        }else{
          this.us.error(data['message'])
        }
      })
    }

  }
