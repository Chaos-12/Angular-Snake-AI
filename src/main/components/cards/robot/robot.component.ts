import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { Robot, Subject, Tolerances } from "src/main/data";
import { BoardLogic, Subscriber, PubSubService, RobotLogic } from "src/main/services";
import { CountDownUtil } from "src/main/utils";

@Component({
  selector: 'app-robot',
  templateUrl: './robot.component.html',
  styleUrls: ['./robot.component.css']
})
export class RobotComponent implements OnInit, OnDestroy, Subscriber {

  @Input()
  public robot!:Robot;

  @Input()
  public tolerances!:Tolerances;

  @Input()
  public info!:string;

  private countDown:CountDownUtil;

  private unSubscribe!:CallableFunction;

  constructor(
    private pubSub:PubSubService,
    private robotLogic:RobotLogic,
    private boardLogic:BoardLogic) {
      this.countDown = new CountDownUtil( this.reset.bind(this) );
    }

  ngOnInit(): void {
    this.unSubscribe = this.pubSub.subscribe(this, Subject.animation);
  }

  ngOnDestroy():void{
    this.unSubscribe();
  }

  public notify(){
    if(this.robot.snake.isAlive){
      this.robotLogic.makeRobotDecide(this.robot);
    } else {
      this.countDown.nextStep();
    }
  }

  private reset():void{
    this.countDown.reset();
    this.boardLogic.resetBoard(this.robot.board);
  }

  public selfDestroy():void{
    this.pubSub.post(Subject.deleteSnake, this.robot.id);
  }
}
