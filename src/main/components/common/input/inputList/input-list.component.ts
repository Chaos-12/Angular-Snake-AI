import { Component, Input, OnInit } from "@angular/core";
import { RobotOld, TolerancesOld } from "src/main/data";

@Component({
  selector: 'app-input-list',
  templateUrl: './input-list.component.html',
  styleUrls: ['./input-list.component.css']
})
export class InputListComponent {

  @Input()
  public ai!:RobotOld;

  @Input()
  public tolerances!:TolerancesOld;

  constructor(){ }

}
