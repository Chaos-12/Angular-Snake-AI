import { Component, HostBinding, Input, OnInit } from "@angular/core";
import { Board } from "src/main/logic";
import { PubSubService, Subject, Subscriber } from "src/main/utils";


@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit, Subscriber{

  @Input()
  public board!:Board;

  @Input()
  public allowedCheats:boolean = false;

  @HostBinding('style.--snake-energy')
  public get snakeEnergy(){
    return `${this.board.snake.energy}%`;
  }

  constructor(private pubSub:PubSubService){ }

  ngOnInit(): void {
    this.pubSub.subscribe(this, Subject.animation);
  }

  private nextStep():void{
    this.board.moveSnake();
  }

  public notify(){
    this.nextStep();
  }
}
