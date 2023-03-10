import { Component } from '@angular/core';
import { Board, Direction, Snake } from 'src/main/data';
import { BoardLogic } from 'src/main/services';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.css']
})
export class PlayComponent {

  public readonly directions = Direction;

  public board:Board;
  public snake:Snake;

  public userKeys:Map<string,Direction>;

  constructor(private boardLogic:BoardLogic) {
    this.board = this.boardLogic.buildBoard();
    this.snake = this.board.snake;

    this.userKeys = new Map();
    this.userKeys.set('ArrowUp', Direction.north);
    this.userKeys.set('ArrowDown', Direction.south);
    this.userKeys.set('ArrowLeft', Direction.west);
    this.userKeys.set('ArrowRight', Direction.east);
  }

  public reset():void{
    this.boardLogic.resetBoard(this.board);
  }
}

