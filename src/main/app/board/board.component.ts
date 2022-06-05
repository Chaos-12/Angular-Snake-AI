import { Component, HostBinding, Input, OnInit } from "@angular/core";
import { Board } from "src/main/logic";


@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

  @Input()
  public board!:Board;

  @Input()
  public allowedCheats:boolean = false;

  @HostBinding('style.--snake-energy')
  public get snakeEnergy(){
    return `${this.board.snake.energy}%`;
  }

  constructor(){ }

  ngOnInit(): void {
  }
}
