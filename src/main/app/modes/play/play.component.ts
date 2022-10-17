import { Component, OnDestroy, OnInit } from '@angular/core';
import { Direction } from 'src/main/enum';
import { Board, Snake } from 'src/main/logic';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.css']
})
export class PlayComponent implements OnInit, OnDestroy {

  public readonly directions = Direction;

  private paused:boolean = true;
  get isPaused():boolean{
    return this.paused;
  }

  private lastRenderTime:number = 0;

  public board:Board;
  public snake:Snake;

  constructor() {
    this.snake = new Snake();
    this.board = new Board(this.snake);
  }

  ngOnInit():void{
    window.addEventListener('keydown', this.keyPress, false);
  }

  ngOnDestroy():void{
    window.removeEventListener('keydown', this.keyPress, false);
  }

  private keyPress = (e:KeyboardEvent) => {
    switch (e.key){
      case 'ArrowUp':
        this.changeSnakeDirection(Direction.north);
        break;
      case 'ArrowDown':
        this.changeSnakeDirection(Direction.south);
        break;
      case 'ArrowLeft':
        this.changeSnakeDirection(Direction.west);
        break;
      case 'ArrowRight':
        this.changeSnakeDirection(Direction.east);
        break;
    }
  }

  public changeSnakeDirection(direction:Direction):void{
    this.snake.lookTo(direction);
  }

  public startAnimation():void{
    this.paused = false;
    window.requestAnimationFrame(this.nextAnimation.bind(this));
  }

  public pauseAnimation():void{
    this.paused = true;
  }

  public reset():void{
    this.pauseAnimation();
    this.board.reset();
  }

  public nextAnimation(currentTime:any):void{
    if(this.paused){
      return;
    }
    window.requestAnimationFrame(this.nextAnimation.bind(this));
    const secondsSinceLastRender = (currentTime - this.lastRenderTime) / 1000;
    if (secondsSinceLastRender < 0.2){
      return;
    }
    this.lastRenderTime = currentTime;
    this.moveSnake();
    if(!this.snake.isAlive){
      this.pauseAnimation();
    }
  }

  public moveSnake():void{
    this.board.moveSnake();
  }
}
