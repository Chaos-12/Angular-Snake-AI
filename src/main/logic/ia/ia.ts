import { Board, Network, Snake } from "src/main/logic";

export class Ia {
  public name:string;
  public snake:Snake;
  public board:Board;
  public network:Network;

  constructor(name:string, network:Network){
    this.name = name;
    this.snake = new Snake();
    this.board = new Board(this.snake);
    this.network = network;
  }
}
