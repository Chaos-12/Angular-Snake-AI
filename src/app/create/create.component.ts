import { Component, OnInit } from '@angular/core';
import { Ia, NetworkBuilder } from 'src/logic';
import { BoardDrawer } from 'src/utils';


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

  constructor(private iaBuilder:NetworkBuilder, private boardDrawer:BoardDrawer) { }

  ngOnInit(): void {
  }

  public createIa():void{
    let name = `IA-${this.foodTolerance}-${this.wallTolerance}-${this.bodyTolerance}`;
    let network = this.iaBuilder.buildNetwork([this.foodTolerance, this.wallTolerance, this.bodyTolerance], 4);
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
    this.boardDrawer.drawBoard(gameBoard, this.createdIas[index].board);
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
