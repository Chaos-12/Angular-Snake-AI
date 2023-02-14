import { Component, OnDestroy, OnInit } from '@angular/core';
import { Robot, Tolerances } from "src/main/entity";
import { RobotLogic } from 'src/main/logic';
import { IdService, PubSubService, Subject, Subscriber } from 'src/main/services';


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit, OnDestroy, Subscriber {

  public robotList:Array<Robot> = [];
  public tolList:Array<Tolerances> = [];

  public tolerances:Tolerances = new Tolerances(0, 0, 0, 0);

  constructor(
    private pubSub:PubSubService,
    private idService:IdService,
    private robotLogic:RobotLogic) { }

  ngOnInit(): void {
    this.pubSub.subscribe(this, Subject.deleteSnake);
    this.createIa(new Tolerances(100, -100, -100, -100));
    this.createIa(new Tolerances(40, -100, -20, -100));
    this.createIa(new Tolerances(30, -100, -10, -80));
    this.createIa(new Tolerances(25, -100, -25, -30));
  }

  ngOnDestroy(): void {
    this.robotList = [];
  }

  notify(message:string):void{
    this.deleteRobot(message);
  }

  public createIa(tolerances:Tolerances):void{
    let newRobot = this.robotLogic.buildRobot(tolerances);
    this.robotList.push(newRobot);
    this.tolList.push(tolerances);
  }

  private deleteRobot(idRobot:string): void{
    for (let i = 0; i<this.robotList.length; i++){
      if (this.robotList[i].id == idRobot){
        this.robotList.splice(i, 1);
        this.tolList.splice(i, 1);
        return;
      }
    }
  }
}
