import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Board, BoardPosition } from 'src/logic/board';
import { Snake } from 'src/logic/snake';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.css']
})
export class PlayComponent implements OnInit, AfterViewInit {

  public name:string = 'user';

  private pause:boolean = true;
  get isPaused(){
    return this.pause;
  }
  private lastRenderTime:number = 0;

  private gameBoard:any;
  private snake:Snake;
  private board:Board;

  constructor() {
    this.snake = new Snake();
    this.board = new Board(this.snake);
  }
  
  ngOnInit():void{
  }

  ngAfterViewInit(){
    this.gameBoard = document.querySelector('.game-board');
    this.draw();
  }

  public start(){
    this.pause = false;
    window.requestAnimationFrame(this.nextStep.bind(this));
  }

  public stop(){
    this.pause = true;
  }

  public reset(){
    this.snake.reset();
    this.draw();
  }

  public nextStep(currentTime:any){
    if(this.pause){
      return;
    }
    window.requestAnimationFrame(this.nextStep.bind(this));
    const secondsSinceLastRender = (currentTime - this.lastRenderTime) / 1000;
    if (secondsSinceLastRender < 1){
      return;
    }
    this.lastRenderTime = currentTime;
    this.board.moveSnake();
    this.draw();
  }

  public record():number{
    return this.snake.Record;
  }

  public score():number{
    return this.snake.score;
  }

  private draw():void{
    this.gameBoard.innerHTML = '';
    this.drawDiv(this.board.food, ['food']);
    this.drawDiv(this.snake.head, ['snake', 'snake-head']);
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
