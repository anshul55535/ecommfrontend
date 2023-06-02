import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';


@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {

  allcategories:any
  constructor(private us: UserService, private router: Router ) {

  }
  ngOnInit(): void {
  }
  addcategory = new FormGroup({
    category: new FormControl('', [Validators.required]),
  });




  category(value:any){

    if(this.addcategory.valid){

    this.us.addcategory(value).subscribe((data:any)=>{
      if(data["success"]){
        this.us.success(data['message'])
        this.router.navigateByUrl('/add_products')
      }
      else{

      }


    })
    }else{
      this.us.error('Field is empty')
    }



  }




}
