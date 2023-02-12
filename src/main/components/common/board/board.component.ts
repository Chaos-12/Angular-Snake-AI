import { Component, HostBinding, Input, OnInit } from "@angular/core";
import { Board } from "src/main/entity";
import { BoardLogic } from "src/main/logic";
import { BoardLogicImpl } from "src/main/logicImpl";
import { PubSubService, Subject, Subscriber } from "src/main/utils";


@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit, Subscriber {

  @Input()
  public board!:Board;

  @HostBinding('style.--snake-energy')
  public get snakeEnergy(){
    return `${this.board.snake.energy}%`;
  }

  constructor(
    private boardLogic:BoardLogic,
    private pubSub:PubSubService){ }

  ngOnInit():void{
    this.pubSub.subscribe(this, Subject.animation);
  }

  public notify(message:Subject):void{
    switch(message){
      case Subject.next:
        this.boardLogic.moveSnakeInside(this.board, this.board.snake);
        break;
      case Subject.reset:
        this.boardLogic.resetBoard(this.board);
        break;
    }
  }
}
