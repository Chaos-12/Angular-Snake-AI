import { Injectable } from "@angular/core";
import { Robot, Tolerances } from "src/main/data";
import { BoardLogic, RobotLogic, SnakeLogic } from "src/main/logic";
import { IdService } from "src/main/services";
import { InputProvider, NetworkBuilder } from "src/main/utils";

@Injectable()
export class RobotLogicImpl extends RobotLogic {

  constructor(
    private inputProvider:InputProvider,
    private networkBuilder:NetworkBuilder,
    private snakeLogic:SnakeLogic,
    private boardLogic:BoardLogic,
    private idService:IdService
  ){
    super()
  }

  public buildRobot(tolerances: Tolerances): Robot {
    let network = this.networkBuilder.buildNetwork(tolerances);
    let robotId = this.idService.generateId();
    let board = this.boardLogic.buildBoard();
    let robot = new Robot(robotId, network, board, board.snake);
    return robot;
  }

  public makeRobotDecide(robot:Robot):void {
    let input = this.inputProvider.getInputFrom(robot.board);
    robot.network.propagateInput(input);
    let outputs = robot.network.obtainOutput();
    for (let direction of outputs){
      let newPosition = robot.snake.head.forward(direction);
      if(!this.boardLogic.hasObstacleIn(robot.board, newPosition)){
        this.snakeLogic.directSnake(robot.board.snake, direction);
        return;
      }
    }
  }

}
