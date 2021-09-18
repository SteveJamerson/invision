import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GoogleComponent } from '../components/icons/google/google.component';
import { CarouselComponent } from '../components/carousel/carousel.component';

@NgModule({
  declarations: [
    GoogleComponent,
    CarouselComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    GoogleComponent,
    CarouselComponent
  ]
})
export class SharedModule { }
