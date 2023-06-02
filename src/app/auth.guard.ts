//auth-guard.service.ts- TypeScript file which facilitates authentication using route guards in client application             ///
//Angular route guards are interfaces which can tell the router whether or not it should allow navigation to a requested route  //
//Used to protect access to client side routes                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//importing required modules and services
import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from "@angular/router";
import { UserService } from "./service/user.service";

//exporting the auth-guard Service
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router,private us:UserService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (localStorage.getItem("token")) {

      return true
    } else {
       this.router.navigateByUrl('/login')
       this.us.error('Please LOGIN...!!')
       return false
    }
  }
}
