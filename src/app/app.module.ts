import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './partial/home/home.component';
import { HeaderComponent } from './partial/header/header.component';
import { LoginComponent } from './pages/login/login.component';
import { LogoutComponent } from './pages/logout/logout.component';
import { SignupComponent } from './pages/signup/signup.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthGuard } from './auth.guard';
import { CartComponent } from './pages/cart/cart.component';
import { AddProductsComponent } from './pages/add-products/add-products.component';
import { AddCategoryComponent } from './pages/add-category/add-category.component';
import { ProductsComponent } from './pages/products/products.component';
import { ProdDetailsComponent } from './pages/prod-details/prod-details.component';
import { EditProdComponent } from './pages/edit-prod/edit-prod.component';
import { MyordersComponent } from './pages/myorders/myorders.component';
import { OrderdetailsComponent } from './pages/orderdetails/orderdetails.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { MessageComponent } from './partial/message/message.component';
import { SellerProdComponent } from './pages/seller-prod/seller-prod.component';
import { CurrencyPipe } from '@angular/common';
import { StarRatingComponent } from './star-rating/star-rating.component';
import { sellerGuard } from './seller.guard';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    LoginComponent,
    LogoutComponent,
    SignupComponent,
    CartComponent,
    AddProductsComponent,
    AddCategoryComponent,
    ProductsComponent,
    ProdDetailsComponent,
    EditProdComponent,
    MyordersComponent,
    OrderdetailsComponent,
    MessageComponent,
    SellerProdComponent,
    StarRatingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,FormsModule,
    NgxPaginationModule,

  ],
  providers: [AuthGuard,CurrencyPipe,sellerGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
