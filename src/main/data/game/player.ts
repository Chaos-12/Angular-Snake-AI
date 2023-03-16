import { Board, Snake } from "src/main/data";

export class Player {

  constructor(
    public readonly id:string,
    public board:Board,
    public snake:Snake){ }
}
