import { Component, Input, OnInit } from '@angular/core';
import { GameComponent } from './game.component';

@Component({
  selector: 'app-user-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class UserGameComponent extends GameComponent {

  constructor() {
    super()
    this.height = 10;
    this.width = 10;
  }

}