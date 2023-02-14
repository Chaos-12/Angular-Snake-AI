import { Component, Input, OnInit } from "@angular/core";
import { Robot, Tolerances } from "src/main/entity";
import { InputProvider, PubSubService, Subject, Subscriber } from "src/main/utils";

@Component({
  selector: 'app-input-list',
  templateUrl: './input-list.component.html',
  styleUrls: ['./input-list.component.css']
})
export class InputListComponent {

  @Input()
  public ai!:Robot;

  @Input()
  public tolerances!:Tolerances;

  constructor(){ }

}
