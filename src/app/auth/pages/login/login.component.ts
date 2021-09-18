import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

  slides = [
    {
      "id": 1,
      "image": "/assets/images/login/Data@2x.png",
      "title": "Marcenas mattis egestas",
      "texto": "Erdum et malesuada fames ac ante ileum primmer in faucibus uspendisse porta.",
    },
    {
      "id": 2,
      "image": "/assets/images/login/Data@2x.png",
      "title": "Marcenas mattis egestas",
      "texto": "Erdum et malesuada fames ac ante ileum primmer in faucibus uspendisse porta.",
    },
    {
      "id": 3,
      "image": "/assets/images/login/Data@2x.png",
      "title": "Marcenas mattis egestas",
      "texto": "Erdum et malesuada fames ac ante ileum primmer in faucibus uspendisse porta.",
    },
    {
      "id": 4,
      "image": "/assets/images/login/Data@2x.png",
      "title": "Marcenas mattis egestas",
      "texto": "Erdum et malesuada fames ac ante ileum primmer in faucibus uspendisse porta.",
    },
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
