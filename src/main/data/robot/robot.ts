import { Board, Brain, Information, RobotInput, Snake } from "src/main/data";

export class Robot {

  public input:RobotInput;
  public output:Information;

  constructor(
    public readonly id:string,
    public brain:Brain,
    public board:Board,
    public snake:Snake){
      this.input = new RobotInput();
      this.output = new Information();
    }
}
