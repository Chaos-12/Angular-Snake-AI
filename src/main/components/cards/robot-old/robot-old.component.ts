import { Component, Input, OnInit } from "@angular/core";
import { RobotOld, Subject, TolerancesOld } from "src/main/data";
import { RobotOldLogic, BoardLogic, Subscriber, PubSubService } from "src/main/services";
import { CountDownUtil } from "src/main/utils";

@Component({
  selector: 'app-robot-old',
  templateUrl: './robot-old.component.html',
  styleUrls: ['./robot-old.component.css']
})
export class RobotOldComponent implements OnInit, Subscriber {

  @Input()
  public robot!:RobotOld;

  @Input()
  public tolerances!:TolerancesOld;

  public countDown:CountDownUtil;

  constructor(
    private pubSub:PubSubService,
    private robotLogic:RobotOldLogic,
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
