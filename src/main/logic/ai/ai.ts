import { Board, InputProvider, Network, Snake } from "src/main/logic";

export class Ai {

  private static readonly maxResetFrames = 10;
  public framesUntilReset = Ai.maxResetFrames;

  public snake:Snake;
  public board:Board;

  constructor(public network:Network){
    this.snake = new Snake();
    this.board = new Board(this.snake);
    this.network = network;
  }

  public makeSnakeDecide(inputProvider:InputProvider):void{
    let input = inputProvider.getInputFrom(this.board);
    this.network.propagateInput(input);
    let output = this.network.obtainOutput();
    let newDirection = this.snake.isOppositeDirection(output[0]) ? output[1] : output[0];
    this.snake.lookTo(newDirection);
  }

  public checkForReset():void{
    if(!this.snake.isAlive){
      if(this.framesUntilReset < 0){
        this.framesUntilReset = Ai.maxResetFrames;
      }
      if(this.framesUntilReset == 0){
        this.reset();
      }
      this.framesUntilReset --;
    }
  }

  public reset():void{
    this.board.reset();
  }
}
