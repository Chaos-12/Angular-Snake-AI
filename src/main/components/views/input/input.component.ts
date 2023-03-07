import { Component, Input } from "@angular/core";
import { RobotInput, InputLabels, Tolerances } from "src/main/data";

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent {

  public inputLabels = InputLabels;

  @Input()
  public input!:RobotInput;

  @Input()
  public tolerances!:Tolerances;

  constructor(){ }

}
