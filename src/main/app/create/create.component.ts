import { Component, OnDestroy, OnInit } from '@angular/core';
import { Directions, Ia, InputProvider, ToleranceManager, Tolerances } from 'src/main/logic';
import { BoardDrawer } from 'src/main/utils';


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit, OnDestroy {

  public addMode:boolean = true;
  public iaList:Array<Ia> = [];

  public foodTolerance:number = 50;
  public wallTolerance:number = 74;
  public bodyTolerance:number = 90;

  private gameBoards:any = [];
  private lastRenderTime = 0;
  private paused:boolean = true;
  get isPaused():boolean{
    return this.paused;
  }

  constructor(private iaBuilder:ToleranceManager, private boardDrawer:BoardDrawer, private inputProvider:InputProvider) { }

  ngOnDestroy(): void {
    this.iaList = [];
  }

  ngOnInit(): void {
  }

  public loadBoards():void{
    this.gameBoards = document.querySelectorAll('.board-ia');
  }

  public createIa():void{
    let name = `IA-${this.foodTolerance}-${this.wallTolerance}-${this.bodyTolerance}`;
    let tolerances = new Tolerances(this.foodTolerance/100, -this.bodyTolerance/100, -this.wallTolerance/100, -this.wallTolerance/100);
    let network = this.iaBuilder.buildNetwork(tolerances);
    this.iaList.push(new Ia(name, network));
  }

  public deleteIa(index:number):void{
    this.iaList.splice(index,1);
  }

  public moveIa(index:number):void{
    let ia = this.iaList[index];
    ia.board.moveSnake();
    let input = this.inputProvider.getInputFrom(ia.board);
    ia.network.propagateInput(input);
    let newDirection = Directions[ia.network.obtainOutput()];
    ia.snake.newDirection(newDirection);
    this.drawBoard(index);
  }

  public drawBoard(index:number):void{
    let gameBoard = document.querySelectorAll('.board-ia')[index];
    this.boardDrawer.drawBoard(gameBoard, this.iaList[index].board);
  }

  public resetAll():void{
    this.pauseAnimation();
    for(let i=0; i<this.iaList.length; i++){
      this.iaList[i].board.reset();
      this.drawBoard(i);
    }
  }

  public startAll():void{
    this.paused = false;
    window.requestAnimationFrame(this.nextAnimation.bind(this));
  }

  public pauseAnimation():void{
    this.paused = true;
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
    this.moveAll();
  }

  public moveAll():void{
    for(let i=0; i<this.iaList.length; i++){
      this.moveIa(i);
    }
  }

}
