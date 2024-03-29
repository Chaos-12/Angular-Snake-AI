import { Injectable } from "@angular/core";
import { Board, Direction, Directions, Information, Position, Robot, Tolerances } from "src/main/data";
import { BrainLogic, IdService, InputLogic, PlayerLogic, PositionLogic, SnakeLogic } from "src/main/services";
import { ArrayUtils } from "src/main/utils";

@Injectable()
export class RobotLogic {

constructor(
  private idService:IdService,
  private brainLogic:BrainLogic,
  private snakeLogic:SnakeLogic,
  private playerLogic:PlayerLogic,
  private positionLogic:PositionLogic,
  private inputLogic:InputLogic){ }

  public buildRobot(tolerances:Tolerances):Robot {
    let robotId = this.idService.generateId();
    let brain = this.brainLogic.buildBrainFrom(tolerances);
    let player = this.playerLogic.buildPlayer(robotId);
    return new Robot(robotId, player.board, player.snake, brain);
  }

  public makeRobotDecide(robot:Robot):void {
    this.playerLogic.nextMove(robot);
    let currentPosition = robot.snake.head;
    robot.input = this.inputLogic.buildInput(robot.board, currentPosition);
    this.brainLogic.propagateInputInto(robot.brain, robot.input);
    robot.output = this.brainLogic.obtainOutputFrom(robot.brain);
    let direction = this.getBestDirection(robot.output, currentPosition, robot.board);
    if(direction !== undefined){
      this.snakeLogic.directSnake(robot.snake, direction);
    }
  }

  public getBestDirection(output:Information, position:Position, board:Board):Direction|undefined {
    //We create an array of directions ordered according to the values of the output
    let orderedDirections = ArrayUtils.order(Directions, (direction) => output.getValue(direction));
    //We return the first direction that is "safe" for the snake
    for (let direction of orderedDirections){
      if (this.positionLogic.isPositionFree(board, position.forward(direction))){
        return direction;
      }
    }
    //If no direction is safe we return "undefined"
    return undefined;
  }
}
