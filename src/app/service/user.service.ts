import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, tap, Subject } from 'rxjs';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  myname: any;

  public message:string = ''
  public messagetype:string | undefined
  baseUrl = 'https://backend-bwqi.onrender.com';
  token: any = localStorage.getItem('token');
  public messageSource = new BehaviorSubject<any>(
    localStorage.getItem('token')
  );
  public message$: Observable<any>;

  public userSource = new BehaviorSubject<any>(localStorage.getItem('token'));
  public userdata: Observable<any>;

  public productSource = new BehaviorSubject<any>('');
  public productdata: Observable<any>;

  public cartSource = new BehaviorSubject<any>(localStorage.getItem('cart'));
  public cartdata : Observable<any>;

  currentuser: any;
  myuser: any;

  constructor(private http: HttpClient) {
    this.message$ = this.messageSource.asObservable();
    this.userdata = this.userSource.asObservable();
    this.productdata = this.productSource.asObservable();
    this.cartdata = this.cartSource.asObservable();



  }

// ########################### message #######################

success(message:string){
  this.message = message
  this.messagetype= 'true'


    setTimeout(() => {
      // Clear the alert message after 3 seconds
      this.message = '';
    }, 2000);
}
error(message:string){
  this.message = message
  this.messagetype= ''


    setTimeout(() => {
      // Clear the alert message after 3 seconds
      this.message = '';
      // this.messagetype
    }, 1000);
}

  getemail(){
    this.message$.subscribe((res) => {
      this.myuser = jwt_decode(res);
      this.currentuser = this.myuser.user.email;

      });

  }

  // decodetoken(){

  //   const token:any =
  //   try {
  //     const decodedToken = jwt_decode(token);
  //     return decodedToken
  //   } catch (error) {
  //   }

  // }

  getuser() {
    this.http
      .get(`${this.baseUrl}/accounts/user`, {
        headers: this.getHeaders(),
      })
      .subscribe((user: any) => {
        return user.isSeller;
      });
  }

  getHeaders() {
    const token = localStorage.getItem('token');

    if (token) {
      const headers = new HttpHeaders({
        Authorization: token,
      });
      return headers;
    } else {
      return;
    }
  }

  userlogin(values: object) {
    return this.http.post(`${this.baseUrl}/accounts/login`, values, {
      headers: this.getHeaders(),
    });
  }

  register(values: object) {
    return this.http.post(`${this.baseUrl}/accounts//signup`, values, {
      headers: this.getHeaders(),
    });
  }

  userlogout() {
    localStorage.removeItem('token');
    this.messageSource.next('');
  }

  // add categories--------------------------

  addcategory(value: any) {
    return this.http.post(`${this.baseUrl}/main/categories`, value, {
      headers: this.getHeaders(),
    });
  }

  getcategory() {
    return this.http.get(`${this.baseUrl}/main/categories`);
  }

  // #######################  add new products ###################

  newproduct(value: any) {
    return this.http.post(`${this.baseUrl}/main/products`, value, {
      headers: this.getHeaders(),
    });
  }

  getallproducts() {
    return this.http.get(`${this.baseUrl}/main/products`);
  }

  prod_detail(id: string) {
    return this.http.get(`${this.baseUrl}/main/products/${id}`, {
      headers: this.getHeaders(),
    });
  }

  edit_prod(id: any, value: any) {
    return this.http.post(
      `${this.baseUrl}/main/editproducts/${id}`,
      value,
      {
        headers: this.getHeaders(),
      }
    );
  }

  // ################## cart ###########################
  getCart() {
    const cart = localStorage.getItem('cart');
    if (cart) {
      const newcart = JSON.parse(cart);
      this.getemail();
      const myemail = this.currentuser;
      const updatedcart = newcart.filter((data: any) => data.user === myemail); // Use equality operator here
      return updatedcart;
    }

    return []
  }

  addToCart(item: any) {
    const cart: any = this.getCart();
    if(item.qty>0){
    const getitem = cart.find((data: any) => data.id._id === item.id._id);

    if (getitem) {
      if (getitem.qty !== item.qty) {
        getitem.qty = item.qty;

        localStorage.setItem('cart', JSON.stringify(cart));

        this.cartSource.next(localStorage.getItem('cart'))

        return true;
      } else {
        return false;
      }
    } else {
      cart.push(item);
      localStorage.setItem('cart', JSON.stringify(cart));
      this.cartSource.next(localStorage.getItem('cart'))

      return true;
    }
  }else{

    return  false}
}


removeFromCart(item: any) {
  let cart: any = this.getCart();
  const cartitem = cart.find((data: any) => data.id._id === item.id._id);
  if (cartitem) {
    cart = cart.filter(
      (data:any) => JSON.stringify(data) !== JSON.stringify(cartitem)
    );
    // this.cartItems--;
    localStorage.setItem("cart", JSON.stringify(cart));
    return 'cart item deleted'
  }
  return
}


// ########################   orders  ######################

orders(order:any){

  return this.http.post(`${this.baseUrl}/accounts/orders`, order, {
      headers: this.getHeaders(),
    });



}

getorders(){
  return this.http.get(`${this.baseUrl}/accounts/orders`,  {
      headers: this.getHeaders(),
    });


}

getordersbyid(id:string){
  return this.http.get(`${this.baseUrl}/accounts/orders/${id}`,  {
      headers: this.getHeaders(),
    });




  }

  deleteordersbyid(id:string){
    return this.http.delete(`${this.baseUrl}/accounts/orders/${id}`,  {
        headers: this.getHeaders(),
      });

}

// ############### search #######################

getsearch(text:string){
  return this.http.get(`${this.baseUrl}/main/search/${text}`,  {
      headers: this.getHeaders(),
    });

}
searchcategory(category:string){
  return this.http.get(`${this.baseUrl}/main/category/${category}`,  {
      headers: this.getHeaders(),
    });

}




// ################ main products ##################

getallsellerproducts() {
  return this.http.get(`${this.baseUrl}/main/sellerproducts`, {
    headers: this.getHeaders(),
  });
}

getsellersearch(text:string){
  return this.http.get(`${this.baseUrl}/main/sellersearch/${text}`,  {
      headers: this.getHeaders(),
    });

}

sellersearchcategory(category:string){
  return this.http.get(`${this.baseUrl}/main/sellercategory/${category}`,  {
      headers: this.getHeaders(),
    });



}


addreview(formData:any){

  return this.http.post(`${this.baseUrl}/main/reviews`, formData, {
      headers: this.getHeaders(),
    });

}

getreview(){

  return this.http.get(`${this.baseUrl}/main/reviews`,  {
      headers: this.getHeaders(),
    });

}

}
