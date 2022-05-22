import { Board, InputProvider, Network, Snake } from "src/main/logic";

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

  public nextStep(inputProvider:InputProvider):void{
    this.board.moveSnake();
    let input = inputProvider.getInputFrom(this.board);
    this.network.propagateInput(input);
    let output = this.network.obtainOutput();
    let newDirection = this.snake.isOppositeDirection(output[0]) ? output[1] : output[0];
    this.snake.newDirection(newDirection);
  }

  public reset():void{
    this.board.reset();
  }
}
