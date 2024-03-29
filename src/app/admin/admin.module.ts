import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../shared/shared.module';
import {ProductAddComponent} from './product-add/product-add.component';
import {ReactiveFormsModule} from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import {ProductEditComponent} from './product-edit/product-edit.component';
import {AdminComponent} from './admin.component';


@NgModule({
  declarations: [
    ProductAddComponent,
    ProductEditComponent,
    AdminComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    MatCardModule,
  ]
})
export class AdminModule {
}
