import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';
import { CarouselService } from 'src/app/core/services/carousel.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit, AfterViewInit {


  @ViewChild('carousel') carousel: ElementRef | undefined | any

  slides = [
    {
      "id": 1,
      "image": "/assets/images/login/Data@2x.png",
      "title": "Marcenas mattis egestas",
      "text": "Erdum et malesuada fames ac ante ileum primmer in faucibus uspendisse porta.",
    },
    {
      "id": 2,
      "image": "/assets/images/login/Data@2x.png",
      "title": "Marcenas mattis egestas",
      "text": "Erdum et malesuada fames ac ante ileum primmer in faucibus uspendisse porta.",
    },
    {
      "id": 3,
      "image": "/assets/images/login/Data@2x.png",
      "title": "Marcenas mattis egestas",
      "text": "Erdum et malesuada fames ac ante ileum primmer in faucibus uspendisse porta.",
    },
    {
      "id": 4,
      "image": "/assets/images/login/Data@2x.png",
      "title": "Marcenas mattis egestas",
      "text": "Erdum et malesuada fames ac ante ileum primmer in faucibus uspendisse porta.",
    },
  ]

  constructor(
    readonly carouselService: CarouselService,
    private authService: AuthService,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.carouselService.init(this.carousel)
  }

}
