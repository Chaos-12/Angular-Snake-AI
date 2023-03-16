import { Board, Brain, Information, Player, RobotInput, Snake } from "src/main/data";

export class Robot extends Player {

  public input:RobotInput;
  public output:Information;

  constructor(id:string, board:Board, snake:Snake, public brain:Brain){
      super(id, board, snake)
      this.input = new RobotInput();
      this.output = new Information();
    }
}
