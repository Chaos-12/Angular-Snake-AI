import { Component, Input, OnInit } from "@angular/core";
import { Position, PositionSetList, Board } from "src/main/logic";


@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

  @Input()
  public board! : Board;

  @Input()
  public allowedCheats : boolean = false;

  constructor(){ }

  ngOnInit(): void {
  }
}
