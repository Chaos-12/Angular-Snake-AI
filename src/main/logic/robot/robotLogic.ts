import { Robot, Tolerances } from "src/main/entity";

export abstract class RobotLogic {
  abstract buildRobot(tolerances:Tolerances):Robot;

  abstract makeRobotDecide(robot:Robot):void;
}
