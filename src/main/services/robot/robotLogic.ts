import { Robot, Tolerances } from "src/main/data";
import { BoardLogic, BrainLogic, IdService, InputLogic } from "src/main/services";

export class RobotLogic {

constructor(
  private idService:IdService,
  private brainLogic:BrainLogic,
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
    let input = this.inputLogic.buildInput(robot.board, robot.snake.head);
    this.brainLogic.propagateInputInto(robot.brain, input);
  }
}
