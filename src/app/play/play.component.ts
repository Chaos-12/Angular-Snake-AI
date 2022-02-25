import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Board, BoardPosition, Direction, Snake } from 'src/logic/index';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.css']
})
export class PlayComponent implements OnInit, AfterViewInit {

  public score:number = 0;
  private paused:boolean = true;
  get isPaused(){
    return this.paused;
  }
  private lastRenderTime:number = 0;

  private gameBoard:any;
  private snake:Snake;
  private board:Board;

  constructor() {
    this.snake = new Snake();
    this.board = new Board(this.snake);
    this.listenArrowKeys();
  }

  ngOnInit():void{
  }

  ngAfterViewInit(){
    this.gameBoard = document.querySelector('.game-board');
    this.draw();
  }

  public start(){
    if(!this.snake.isAlive){
      this.reset();
    }
    this.paused = false;
    window.requestAnimationFrame(this.nextStep.bind(this));
  }

  public stop(){
    this.paused = true;
  }

  public reset(){
    this.snake.reset();
    this.draw();
  }

  public nextStep(currentTime:any){
    if(this.paused){
      return;
    }
    window.requestAnimationFrame(this.nextStep.bind(this));
    const secondsSinceLastRender = (currentTime - this.lastRenderTime) / 1000;
    if (secondsSinceLastRender < 0.2){
      return;
    }
    this.lastRenderTime = currentTime;
    this.board.moveSnake();
    this.draw();
    if(!this.snake.isAlive){
      this.stop();
    }
  }

  public record():number{
    return this.snake.Record;
  }

  public updateScore():void{
    this.score = this.snake.score;
  }

  private draw():void{
    this.gameBoard.innerHTML = '';
    this.drawDiv(this.board.food, ['food']);
    this.drawDiv(this.snake.head, ['snake', 'snake-head', `rotate${this.snake.direction*90}`]);
    this.snake.body.forEach(part => {
      this.drawDiv(part, ['snake', 'snake-body']);
    });
    this.updateScore();
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

  private listenArrowKeys():void{
    window.addEventListener('keydown', e =>{
      switch (e.key){
        case 'ArrowUp':
          this.snake.newDirection(Direction.north);
          console.log('hey');
          break;
        case 'ArrowDown':
          this.snake.newDirection(Direction.south);
          break;
        case 'ArrowLeft':
          this.snake.newDirection(Direction.west);
          break;
        case 'ArrowRight':
          this.snake.newDirection(Direction.east);
          break;
      }
      if(this.paused){
        this.start();
      }
    })
  }
}
