import { Component, OnDestroy, OnInit } from '@angular/core';
import { Directions, Ia, InputProvider, ToleranceManager, Tolerances } from 'src/main/logic';


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit, OnDestroy {

  private static readonly deathResetFrames = 10;

  public iaList:Array<Ia> = [];
  public tolList:Array<Tolerances> = [];
  public framesUntilReset:Array<number> = [];

  public tolerances:Tolerances = new Tolerances(0, 0, 0, 0);

  private lastRenderTime = 0;
  private paused:boolean = true;
  get isPaused():boolean{
    return this.paused;
  }

  constructor(private iaBuilder:ToleranceManager, private inputProvider:InputProvider) { }

  ngOnDestroy(): void {
    this.iaList = [];
  }

  ngOnInit(): void {
    this.createIa(new Tolerances(100, -100, -100, -100));
    this.createIa(new Tolerances(40, -100, -20, -100));
    this.createIa(new Tolerances(30, -100, -10, -80));
    this.createIa(new Tolerances(25, -100, -25, -30));
  }

  public createIa(tolerances:Tolerances):void{
    let network = this.iaBuilder.buildNetwork(tolerances);
    this.iaList.push(new Ia(network));
    this.tolList.push(tolerances);
    this.framesUntilReset.push(-1);
  }

  public deleteIa(index:number):void{
    this.iaList.splice(index, 1);
    this.tolList.splice(index, 1);
    this.framesUntilReset.splice(index, 1);
  }

  public moveIa(index:number):void{
    let ia = this.iaList[index];
    ia.nextStep(this.inputProvider);
    if(!ia.snake.isAlive){
      if(this.framesUntilReset[index] < 0){
        this.framesUntilReset[index] = CreateComponent.deathResetFrames;
      }
      if(this.framesUntilReset[index] == 0){
        ia.reset();
      }
      this.framesUntilReset[index] --;
    }
  }

  public resetAll():void{
    this.pauseAnimation();
    for(let i=0; i<this.iaList.length; i++){
      this.iaList[i].reset();
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
