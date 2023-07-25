import { Component, OnDestroy, OnInit } from '@angular/core';
import { InputType, Robot, Subject, Tolerances } from "src/main/data";
import { RobotLogic } from 'src/main/services';
import { PubSubService, Subscriber } from 'src/main/services';
import { ArrayUtils } from 'src/main/utils';


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit, OnDestroy, Subscriber {

  public foodTol:number = 0;
  public wallTol:number = 0;
  public bodyTol:number = 0;
  public rockTol:number = 0;

  public robotList:Array<Robot> = [];
  public toleranceList:Array<Tolerances> = [];

  public info:Array<string> = ['None', 'Input', 'Output']
  public infoIndex:number = 0;

  public selected:number = -1;

  private unSubscribe!:CallableFunction;

  constructor(
    private pubSub:PubSubService,
    private robotLogic:RobotLogic) { }

  ngOnInit():void{
    this.unSubscribe = this.pubSub.subscribe(this, Subject.deleteSnake);

    this.createNewRobot(100, -100, -100, -100);
    this.createNewRobot(100, -80, -80, 0);
    this.createNewRobot(100, -80, -80, -20);
    this.createNewRobot(100, -80, -20, -80);
    this.createNewRobot(100, -20, -80, -80);
  }

  ngOnDestroy():void{
    this.unSubscribe();
    this.robotList = [];
    this.toleranceList = [];
  }

  notify(robotId:string):void{
    this.deleteRobot(robotId);
  }

  public createNewRobot(foodTol:number, bodyTol:number, wallTol:number, rockTol:number):void {
    let tolerance = new Tolerances();
    tolerance.setValue(InputType.food, foodTol);
    tolerance.setValue(InputType.body, bodyTol);
    tolerance.setValue(InputType.wall, wallTol);
    tolerance.setValue(InputType.rock, rockTol);
    tolerance.map(value => value/100);
    this.toleranceList.push(tolerance);

    let newRobot = this.robotLogic.buildRobot(tolerance);
    this.robotList.push(newRobot);
  }

  private deleteRobot(robotId:string): void{
    for (let i = 0; i<this.robotList.length; i++){
      if (this.robotList[i].id == robotId){
        ArrayUtils.removeAtIndex(this.robotList, i);
        ArrayUtils.removeAtIndex(this.toleranceList, i);
        if(this.selected == i){
          this.selected = -1;
        }
        if(this.selected > i){
          this.selected --;
        }
        return;
      }
    }
  }

  public nextInfo():void{
    this.infoIndex ++;
    if (this.infoIndex >= this.info.length){
      this.infoIndex = 0;
    }
  }

  public prevInfo():void{
    this.infoIndex --;
    if (this.infoIndex < 0){
      this.infoIndex = this.info.length-1;
    }
  }

  public selectRobot(index:number):void{
    if (this.selected === index){
      this.selected = -1;
    } else {
      this.selected = index;
    }
  }
}
