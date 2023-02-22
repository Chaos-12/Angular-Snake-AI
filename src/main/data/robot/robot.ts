import { Board, Brain, Input, Snake } from "src/main/data";

export class Robot {
  constructor(
    public readonly id:string,
    public brain:Brain,
    public board:Board,
    public snake:Snake){ }
}
