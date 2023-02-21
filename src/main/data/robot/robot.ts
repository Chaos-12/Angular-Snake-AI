import { Board, Brain, Input, Snake } from "src/main/data";

export class Robot {
  constructor(
    public readonly id:string,
    public network:Brain,
    public board:Board,
    public snake:Snake,
    public input:Input){ }
}
