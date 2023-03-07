import { Component, OnDestroy, OnInit } from '@angular/core';
import { InputType, Robot, Subject, Tolerances } from "src/main/data";
import { RobotLogic } from 'src/main/services';
import { PubSubService, Subscriber } from 'src/main/services';


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

  constructor(
    private pubSub:PubSubService,
    private robotLogic:RobotLogic) { }

  ngOnInit(): void {
    this.pubSub.subscribe(this, Subject.deleteSnake);

    this.createNewRobot(100, -100, -100, -100);
    this.createNewRobot(100, -80, -80, 0);
    this.createNewRobot(100, -80, -80, 20);
    this.createNewRobot(100, -80, -80, -20);
    this.createNewRobot(100, -80, -20, -80);
    this.createNewRobot(100, -20, -80, -80);
  }

  ngOnDestroy(): void {
    this.robotList = [];
    this.toleranceList = [];
  }

  notify(message:string):void{
    this.deleteRobot(message);
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

  private deleteRobot(idRobot:string): void{
    for (let i = 0; i<this.robotList.length; i++){
      if (this.robotList[i].id == idRobot){
        this.robotList.splice(i, 1);
        this.toleranceList.splice(i, 1);
        return;
      }
    }
  }
}
