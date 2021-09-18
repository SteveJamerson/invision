import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GoogleComponent } from '../components/icons/google/google.component';



@NgModule({
  declarations: [
    GoogleComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    GoogleComponent
  ]
})
export class SharedModule { }
