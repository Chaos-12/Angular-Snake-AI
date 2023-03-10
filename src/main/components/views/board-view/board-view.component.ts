import { Component, HostBinding, Input, OnInit } from "@angular/core";
import { Board, Subject } from "src/main/data";
import { BoardLogic } from "src/main/services";
import { PubSubService, Subscriber } from "src/main/services";


@Component({
  selector: 'app-board-view',
  templateUrl: './board-view.component.html',
  styleUrls: ['./board-view.component.scss']
})
export class BoardViewComponent implements OnInit, Subscriber {

  @Input()
  public board!:Board;

  @Input()
  public animated:Boolean = true;

  @HostBinding('style.--snake-energy')
  public get snakeEnergy(){
    return `${this.board.snake.energy}%`;
  }

  constructor(
    private boardLogic:BoardLogic,
    private pubSub:PubSubService){ }

  ngOnInit():void{
    if(this.animated){
      this.pubSub.subscribe(this, Subject.animation);
    }
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
