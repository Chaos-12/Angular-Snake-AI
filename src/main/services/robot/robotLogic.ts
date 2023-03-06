import { Injectable } from "@angular/core";
import { Board, Direction, Directions, Information, Position, Robot, Tolerances } from "src/main/data";
import { BoardLogic, BrainLogic, IdService, InputLogic, SnakeLogic } from "src/main/services";

@Injectable()
export class RobotLogic {

constructor(
  private idService:IdService,
  private brainLogic:BrainLogic,
  private snakeLogic:SnakeLogic,
  private boardLogic:BoardLogic,
  private inputLogic:InputLogic){ }

  public buildRobot(tolerances:Tolerances):Robot {
    let robotId = this.idService.generateId();
    let brain = this.brainLogic.buildBrainFrom(tolerances);
    let board = this.boardLogic.buildBoard();
    return new Robot(robotId, brain, board, board.snake);
  }

  public makeRobotDecide(robot:Robot):void {
    this.boardLogic.moveSnakeInside(robot.board, robot.snake);
    let currentPosition = robot.snake.head;
    let input = this.inputLogic.buildInput(robot.board, currentPosition);
    this.brainLogic.propagateInputInto(robot.brain, input);
    let output = this.brainLogic.obtainOutputFrom(robot.brain);
    let direction = this.getBestDirection(output, currentPosition, robot.board);
    if(direction !== undefined){
      this.snakeLogic.directSnake(robot.snake, direction);
    }
  }

  public getBestDirection(output:Information, position:Position, board:Board):Direction|undefined {
    //We create an array of directions ordered according to the values of the output
    let orderedDirections = new Array<Direction>();
    for (let direction of Directions){
      let unassigned = true;
      for (let i=0; unassigned && i<orderedDirections.length; i++){
        if (output.getValue(direction) > output.getValue(orderedDirections[i])){
          orderedDirections.splice(i, 0, direction);
          unassigned = false;
        }
      }
      if(unassigned){
        orderedDirections.push(direction);
      }
    }
    //We return the first direction that is "safe" for the snake
    for (let direction of orderedDirections){
      if (!this.boardLogic.hasObstacleIn(board, position.forward(direction))){
        return direction;
      }
    }
    //If no direction is safe we return "undefined"
    return undefined;
  }
}
