import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';
@Component({
  selector: 'app-edit-prod',
  templateUrl: './edit-prod.component.html',
  styleUrls: ['./edit-prod.component.css']
})
export class EditProdComponent {

  user: any = ''
  allcategory: any;

  product: any;





  title: string = ''
  cate: any
  image: any = ''
  description: string=''
  price: string=''
  quantity:string=''

  constructor(private us: UserService,private router:Router, private route: ActivatedRoute) {
    this.us.getcategory().subscribe((res) => {
      const data: any = res;
      this.allcategory = data['categories'];
    });

    this.route.params.subscribe((params) => {
      const id = params['id'];

      // Use the id parameter in your logic or make an API call
      this.us.prod_detail(id).subscribe((res) => {
        const data:any = res
        this.product = data['product'];

        this.title = this.product.title
        // this.image= this.product.image.slice(14)
        this.description = this.product.description
        this.price = this.product.price
        this.quantity=this.product.quantity
      });
    });
  }


  ngOnInit(): void {

  }

  fileChange(event: any) {
    if (event.target.files && event.target.files.length) {
      const file = event.target.files[0];
      this.image = file
    }
  }

  prod() {


      const formData = new FormData();
      formData.append('title', this.title);
      formData.append('category', this.cate);
      formData.append('image', this.image);
      formData.append('description', this.description);
      formData.append('price', this.price);
      formData.append('quantity', this.quantity);





      this.us.edit_prod(this.product._id,formData).subscribe((data:any) => {
        if(data['success']){
          this.us.success(data['message'])
          this.router.navigateByUrl('/')
        }else{
          this.us.error(data['message'])
        }

      });
    }
  }





