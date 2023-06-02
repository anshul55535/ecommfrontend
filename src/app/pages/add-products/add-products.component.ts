import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-add-products',
  templateUrl: './add-products.component.html',
  styleUrls: ['./add-products.component.css'],
})
export class AddProductsComponent implements OnInit {
  user: any = ''
  allcategory: any;


  productForm!: FormGroup; // Add "!" to indicate it will be initialized later
  allcategories: any;

  constructor(
    private us: UserService,
    private router: Router,
    private formBuilder: FormBuilder,
  ) {
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



  }

  ngOnInit(): void {







    this.productForm = this.formBuilder.group({
      title: ['abcd', Validators.required],
      category: ['tv', Validators.required],
      image: [null, Validators.required],
      description: ['shbdbcb', Validators.required],
      price: ['21554', Validators.required],
      quantity: ['102', Validators.required],
    });
  }

  fileChange(event: any) {
    if (event.target.files && event.target.files.length) {
      const file = event.target.files[0];
      this.productForm.controls['image'].setValue(file);
    }
  }

  prod() {
    if (this.productForm.valid) {
      const productData = this.productForm.value;

      const formData = new FormData();
      formData.append('title', productData.title);
      formData.append('category', productData.category);
      formData.append('image', productData.image);
      formData.append('description', productData.description);
      formData.append('price', productData.price);
      formData.append('quantity', productData.quantity);

      this.us.newproduct(formData).subscribe((data) => {
        this.router.navigateByUrl('/');
      });
    } else {
    }
  }
}
