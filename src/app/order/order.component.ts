import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {GlobalVariables} from '../shared/global-variables';
import {Router} from '@angular/router';
import {CartService} from '../services/cart.service';
import {Order} from '../models/order.model';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  orderForm: FormGroup;
  order: Order;
  cartProducts = [];
  totalPrice = 0;

  constructor(private globals: GlobalVariables, private cartService: CartService, private router: Router) {
  }

  ngOnInit() {
    this.globals.setPage('order');
    this.getCartProducts();
    this.orderForm = new FormGroup({
      orderAddress: new FormControl(),
      orderZipcode: new FormControl(),
      orderTotal: new FormControl()
    });
  }

  calculateTotalPrice() {
    const cartProducts = this.cartProducts;
    let totalPrice = 0;
    let i;
    for (i = 0; i < cartProducts.length; i++) {
      totalPrice = totalPrice + cartProducts[i].product.price * cartProducts[i].amount;
    }
    return totalPrice;


  }

  sortCartProducts(carts) {
    carts.sort((a, b) => (
      a.product.name > b.product.name) ? 1 : ((b.product.name > a.product.name) ? -1 : 0));
    return carts;
  }

  getCartProducts() {
    this.cartService.getCartByUser().subscribe(
      (carts: any[]) => {
        this.cartProducts = this.sortCartProducts(carts);
        this.checkIfCartIsEmpty();
        this.totalPrice = this.calculateTotalPrice();
      }
    );
  }

  checkIfCartIsEmpty() {
    if (this.cartProducts.length === 0) {
      this.router.navigate(['../cart']);
    }
  }

  addOrder() {
    const address = this.orderForm.controls.orderAddress.value;
    const zipcode = this.orderForm.controls.orderZipcode.value;
    const total = this.orderForm.controls.orderTotal.value;
    this.order = new Order(null, address, zipcode, total, null);
    // this.orderService.newOrder(this.order).subscribe(() => {
    //   this.router.navigate(['../home']).then();
    // });
  }
}
