import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Board, BoardPosition, Direction, Snake } from 'src/logic/index';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.css']
})
export class PlayComponent implements OnInit, OnDestroy, AfterViewInit {

  private paused:boolean = true;
  get isPaused():boolean{
    return this.paused;
  }

  private lastRenderTime:number = 0;

  private gameBoard:any;
  private board:Board;
  private snake:Snake;
  get isSnakeAlive():boolean{
    return this.snake.isAlive;
  }
  get snakeDeath():string{
    return this.snake.deathReason;
  }
  get snakeSteps():number{
    return this.snake.nSteps;
  }
  get snakeFoods():number{
    return this.snake.nFood;
  }
  get snakeScore():number{
    return this.snake.score;
  }
  get snakeRecord():number{
    return this.snake.record;
  }

  constructor() {
    this.snake = new Snake();
    this.board = new Board(this.snake);
  }

  ngOnInit():void{
    window.addEventListener('keyup', this.keyPress, false);
  }

  ngOnDestroy():void{
    window.removeEventListener('keyup', this.keyPress, false);
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
    this.snake.newDirection(direction);
    this.drawBoard();
  }

  ngAfterViewInit():void{
    this.gameBoard = document.querySelector('.board-user');
    this.drawBoard();
  }

  public start():void{
    this.paused = false;
    window.requestAnimationFrame(this.nextStep.bind(this));
  }

  public stop():void{
    this.paused = true;
  }

  public reset():void{
    this.stop();
    this.snake.reset();
    this.drawBoard();
  }

  public nextStep(currentTime:any):void{
    if(this.paused){
      return;
    }
    window.requestAnimationFrame(this.nextStep.bind(this));
    const secondsSinceLastRender = (currentTime - this.lastRenderTime) / 1000;
    if (secondsSinceLastRender < 0.2){
      return;
    }
    this.lastRenderTime = currentTime;
    this.moveSnake();
    if(!this.snake.isAlive){
      this.stop();
    }
  }

  public moveSnake():void{
    this.board.moveSnake();
    this.drawBoard();
  }

  private drawBoard():void{
    this.gameBoard.innerHTML = '';
    this.drawDiv(this.board.food, ['food']);
    this.drawDiv(this.snake.head, ['snake', 'snake-head', `rotate${this.snake.direction*90}`]);
    this.snake.body.forEach(part => {
      this.drawDiv(part, ['snake', 'snake-body']);
    });
  }

  private drawDiv(position:BoardPosition, textClass:string[]):void{
    const element = document.createElement('div');
    element.style.gridColumn = position.x.toString();
    element.style.gridRow = position.y.toString();
    textClass.forEach( text => {
      element.classList.add(text);
    })
    this.gameBoard.appendChild(element);
  }
}
