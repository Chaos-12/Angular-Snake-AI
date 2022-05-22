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

  public tolerances:Tolerances = new Tolerances(20, 75, 80, 75);

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
    this.createIa(new Tolerances(100, 0, 0, 0));
    this.createIa(new Tolerances(10, 50, 50, 50));
  }

  public loadBoards():void{
    this.gameBoards = document.querySelectorAll('.board-ia');
  }

  public createIa(tolerances:Tolerances):void{
    let name = `IA-${tolerances.food}-${tolerances.body}-${tolerances.wall}`;
    let network = this.iaBuilder.buildNetwork(tolerances);
    this.iaList.push(new Ia(name, network));
  }

  public deleteIa(index:number):void{
    this.iaList.splice(index,1);
  }

  public moveIa(index:number):void{
    let ia = this.iaList[index];
    ia.nextStep(this.inputProvider);
    this.drawBoard(index);
  }

  public drawBoard(index:number):void{
    let gameBoard = document.querySelectorAll('.board-ia')[index];
    this.boardDrawer.drawBoard(gameBoard, this.iaList[index].board);
  }

  public resetAll():void{
    this.pauseAnimation();
    for(let i=0; i<this.iaList.length; i++){
      this.iaList[i].reset();
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
