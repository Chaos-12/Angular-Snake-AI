import { Component, OnInit } from '@angular/core';
import { GameComponent } from '../game/game.component';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.css']
})
export class PlayComponent implements OnInit {

  public userGame:any = new GameComponent();

  constructor() { }

  ngOnInit(): void {
  }

}
