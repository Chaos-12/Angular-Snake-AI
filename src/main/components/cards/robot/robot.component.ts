import { Component, Input, OnInit } from "@angular/core";
import { Robot, Subject, TolerancesOld } from "src/main/data";
import { RobotLogic, BoardLogic, Subscriber, PubSubService } from "src/main/services";
import { CountDownUtil } from "src/main/utils";

@Component({
  selector: 'app-robot',
  templateUrl: './robot.component.html',
  styleUrls: ['./robot.component.css']
})
export class RobotComponent implements OnInit, Subscriber {

  @Input()
  public robot!:Robot;

  @Input()
  public tolerances!:TolerancesOld;

  public countDown:CountDownUtil;

  constructor(
    private pubSub:PubSubService,
    private robotLogic:RobotLogic,
    private boardLogic:BoardLogic) {
      this.countDown = new CountDownUtil( this.reset.bind(this) );
    }

  ngOnInit(): void {
    this.pubSub.subscribe(this, Subject.animation);
  }

  public notify(message:Subject){
    switch(message){
      case Subject.next:
        if(this.robot.snake.isAlive){
          this.robotLogic.makeRobotDecide(this.robot);
        } else {
          this.countDown.nextStep();
        }
        break;
      case Subject.reset:
        this.reset();
        break;
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
