import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';
import jwt_decode from 'jwt-decode';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  navbg:any ;
  islogin:any
  isseller:any
  userdata:any



  constructor(public us:UserService, private router:Router){}




ngOnInit(){this.us.message$.subscribe((res)=>{
  this.islogin =res

    this.userdata = jwt_decode(res)
    this.isseller = this.userdata.user.isSeller
  })





}


  logout(){
    this.us.userlogout()

    this.router.navigateByUrl('/login');
    }


}
