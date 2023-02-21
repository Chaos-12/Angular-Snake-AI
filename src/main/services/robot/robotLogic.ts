import { Input, Robot, Tolerances } from "src/main/data";
import { BoardLogic, BrainLogic, IdService } from "src/main/services";

export class RobotLogic {

constructor(
  private idService:IdService,
  private brainLogic:BrainLogic,
  private boardLogic:BoardLogic){ }

  public buildRobot(tolerances:Tolerances):Robot {
    let robotId = this.idService.generateId();
    let brain = this.brainLogic.buildBrainFrom(tolerances);
    let board = this.boardLogic.buildBoard();
    return new Robot(robotId, brain, board, board.snake, new Input());
  }
}
