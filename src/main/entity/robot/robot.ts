import { Board, Network, Snake } from "src/main/entity";

export class Robot {

  constructor(
    public readonly id:string,
    public network:Network,
    public board:Board,
    public snake:Snake){ }

}
