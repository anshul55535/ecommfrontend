import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {


  loginForm!: FormGroup ;
  isSubmitted = false;

  constructor(private us: UserService, private router: Router) {

  }


  ngOnInit() {
    // Check if the user is authenticated

this.loginForm = new FormGroup({
  email: new FormControl('', [Validators.required, Validators.email]),
  password: new FormControl('', [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*[@#$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]),
});
  }

  login(values: object) {
    this.isSubmitted = true;
    if (this.loginForm.invalid) {
      return;
    } else {
      this.us.userlogin(values).subscribe((res) => {

        const data: any = res;

        if (data['success']) {
          localStorage.setItem('token', data['token']);
          this.us.success(data['message'])
          this.us.messageSource.next(localStorage.getItem('token'))

          this.router.navigateByUrl('/')
        }
        else{
          this.us.error(data['message'])
        }
      });
    }
  }
}
