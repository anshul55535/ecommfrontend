import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {


  signupForm!: FormGroup ;
  isSubmitted: boolean= false

  constructor(private us:UserService, private router:Router){
  this.signupForm = new FormGroup  ({

    email: new FormControl('', [Validators.required, Validators.email]),
  password: new FormControl('', [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*[@#$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]),
 name: new FormControl('',Validators.required),
     isSeller : new FormControl( false)


  })
  }


  signup(values:object){
    this.isSubmitted = true;



      if(this.signupForm.invalid) {
        this.us.error('All fields Required')
        return;
      }
      else  {
        this.us.register(values).subscribe((res)=>{
          const data:any = res

          if (data["success"]) {
            localStorage.setItem("token", data["token"]);
            this.us.success(data['message'])

            this.router.navigateByUrl('/login')

          }else{
            this.us.error(data['message'])


          }
      })

    }
  }


}

