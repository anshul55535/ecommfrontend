import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerProdComponent } from './seller-prod.component';

describe('SellerProdComponent', () => {
  let component: SellerProdComponent;
  let fixture: ComponentFixture<SellerProdComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SellerProdComponent]
    });
    fixture = TestBed.createComponent(SellerProdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
