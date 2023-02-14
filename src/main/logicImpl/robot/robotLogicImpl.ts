import { Injectable } from "@angular/core";
import { Robot, Direction } from "src/main/entity";
import { RobotLogic } from "src/main/logic/robot";
import { SnakeLogic } from "src/main/logic/game";
import { InputProvider } from "src/main/utils";

@Injectable()
export class RobotLogicImpl extends RobotLogic {

  constructor(
    private inputProvider:InputProvider,
    private snakeLogic:SnakeLogic
  ){
    super()
  }

  public makeAiDecide(ai:Robot):void {
    let input = this.inputProvider.getInputFrom(ai.board);
    ai.network.propagateInput(input);
    let output = ai.network.obtainOutput();
    let validOutputs = this.removeInvalidOutput(output);
    if(validOutputs.length){
      this.snakeLogic.directSnake(ai.board.snake, validOutputs[0]);
    }
  }

  private removeInvalidOutput(output:Array<Direction>):Array<Direction>{
    let validDirections = new Array<Direction>();

    return validDirections;
  }
}
