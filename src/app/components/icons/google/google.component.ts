import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-google',
  templateUrl: './google.component.svg',
  styleUrls: ['./google.component.scss']
})
export class GoogleComponent implements OnInit {

  @Input() size: string = "24";

  constructor() { }

  ngOnInit(): void {
    this.size = this.size.replace(/\D/g,'')
  }

}
