import { Component, Input, OnInit } from '@angular/core';
import { Board, Position, Network, Snake } from 'src/logic';
import { IaBuilder } from 'src/utils';

class Ia {
  public name:string;
  public snake:Snake;
  public board:Board;
  public network:Network;

  constructor(name:string, network:Network){
    this.name = name;
    this.snake = new Snake();
    this.board = new Board(this.snake);
    this.network = network;
  }
}

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  public addMode:boolean = true;
  public createdIas:Array<Ia> = [];

  public foodTolerance:number = 50;
  public wallTolerance:number = 74;
  public bodyTolerance:number = 90;

  private gameBoards:any = [];
  public isPaused:boolean = true;

  constructor(private iaBuilder:IaBuilder) { }

  ngOnInit(): void {
  }

  public createIa():void{
    let name = `IA-${this.foodTolerance}-${this.wallTolerance}-${this.bodyTolerance}`;
    let network = this.iaBuilder.buildNetwork(this.foodTolerance, this.wallTolerance, this.bodyTolerance);
    this.createdIas.push(new Ia(name, network));
  }

  public deleteIa(index:number):void{
    this.createdIas.splice(index,1);
  }

  public loadBoards():void{
    this.gameBoards = document.querySelectorAll('.board-ia');
  }

  public drawBoard(index:number):void{
    let gameBoard = document.querySelectorAll('.board-ia')[index];
    gameBoard.innerHTML = '';
    let ia = this.createdIas[index];
    this.drawDiv(gameBoard, ia.board.food, ['food']);
    this.drawDiv(gameBoard, ia.snake.head, ['snake', 'snake-head', `rotate${ia.snake.direction*90}`]);
    ia.snake.body.forEach(part => {
      this.drawDiv(gameBoard, part, ['snake', 'snake-body']);
    });
  }

  private drawDiv(container:any, position:Position, textClass:string[]):void{
    const element = document.createElement('div');
    element.style.gridColumn = position.x.toString();
    element.style.gridRow = position.y.toString();
    textClass.forEach( text => {
      element.classList.add(text);
    })
    container.appendChild(element);
  }

  public resetAll():void{

  }

  public startAll():void{

  }

  public stopAll():void{

  }

  public moveAllSnake():void{

  }

}
