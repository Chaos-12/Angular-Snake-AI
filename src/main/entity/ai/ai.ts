import { Board, Direction, Network, Snake } from "src/main/entity";
import { InputProvider } from "src/main/utils";

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
    let validDirections = this.removeDeathDirections(output);
    if(validDirections.length){
      this.snake.lookTo(validDirections[0]);
    }
  }

  private removeDeathDirections(output:Array<Direction>):Array<Direction>{
    let noObstacleDirections = new Array<Direction>();
    output.forEach(direction => {
      let newHeadPosition = this.snake.head.forward(direction);
      if (this.snake.contains(newHeadPosition)){
        return;
      }
      if (this.board.rocks.contains(newHeadPosition)){
        return;
      }
      if (!this.board.contains(newHeadPosition)){
        return;
      }
      noObstacleDirections.push(direction);
    })
    return noObstacleDirections;
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
