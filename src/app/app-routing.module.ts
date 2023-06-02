import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './partial/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { LogoutComponent } from './pages/logout/logout.component';
import { SignupComponent } from './pages/signup/signup.component';
import { CartComponent } from './pages/cart/cart.component';
import { AuthGuard } from './auth.guard';
import { AddCategoryComponent } from './pages/add-category/add-category.component';
import { AddProductsComponent } from './pages/add-products/add-products.component';
import { ProductsComponent } from './pages/products/products.component';
import { ProdDetailsComponent } from './pages/prod-details/prod-details.component';
import { EditProdComponent } from './pages/edit-prod/edit-prod.component';
import { MyordersComponent } from './pages/myorders/myorders.component';
import { OrderdetailsComponent } from './pages/orderdetails/orderdetails.component';
import { SellerProdComponent } from './pages/seller-prod/seller-prod.component';
import { sellerGuard } from './seller.guard';

const routes: Routes = [


  {path:'',component:HomeComponent},
  {path:'login',component:LoginComponent}
,  {path:'logout',component:LogoutComponent}
,  {path:'signup',component:SignupComponent},
{path:'add-cat',component:AddCategoryComponent,canActivate :[AuthGuard,sellerGuard]},

{path:'add_products', component:AddProductsComponent, canActivate :[sellerGuard]},
{path:'products',component:ProductsComponent},
{path:'prod_detail/:id',component:ProdDetailsComponent},
{path:'edit_prod/:id',component:EditProdComponent,canActivate :[AuthGuard,sellerGuard]},
{path:'cart',component:CartComponent},
{path:'myorders',component:MyordersComponent,canActivate :[AuthGuard]},
{path:'orders/:id',component:OrderdetailsComponent,canActivate :[AuthGuard]},
{
  path:'seller_prod',component:SellerProdComponent,canActivate :[AuthGuard,sellerGuard]
}




];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
