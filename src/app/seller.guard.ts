//auth-guard.service.ts- TypeScript file which facilitates authentication using route guards in client application             ///
//Angular route guards are interfaces which can tell the router whether or not it should allow navigation to a requested route  //
//Used to protect access to client side routes                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//importing required modules and services
import { Injectable } from "@angular/core";
import jwt_decode from 'jwt-decode';

import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from "@angular/router";
import { UserService } from "./service/user.service";

//exporting the auth-guard Service
@Injectable()
export class sellerGuard implements CanActivate {
  userdata: any;
  isseller: any = '';
  constructor(private router: Router,private us:UserService) {

    this.us.message$.subscribe((res) => {
      console.log('in res ');
      this.userdata = jwt_decode(res);
      this.isseller = this.userdata.user.isSeller;
    });

  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.isseller) {

      return true
    } else {
       this.router.navigateByUrl('/')
       this.us.error('Not Authorized')
       return false
    }
  }
}
