import { Component, HostBinding, Input } from "@angular/core";
import { Board } from "src/main/data";
import { BoardLogic } from "src/main/services";

@Component({
  selector: 'app-board-view',
  templateUrl: './board-view.component.html',
  styleUrls: ['./board-view.component.scss']
})
export class BoardViewComponent {

  @Input()
  public board!:Board;

  @HostBinding('style.--snake-energy')
  public get snakeEnergy(){
    return `${this.board.snakeList[0].energy}%`;
  }

  constructor(private boardLogic:BoardLogic){ }

  public reset():void{
    this.boardLogic.resetBoard(this.board);
  }
}
