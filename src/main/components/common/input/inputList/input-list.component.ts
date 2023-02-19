import { Component, Input, OnInit } from "@angular/core";
import { Robot, TolerancesOld } from "src/main/data";

@Component({
  selector: 'app-input-list',
  templateUrl: './input-list.component.html',
  styleUrls: ['./input-list.component.css']
})
export class InputListComponent {

  @Input()
  public ai!:Robot;

  @Input()
  public tolerances!:TolerancesOld;

  constructor(){ }

}
