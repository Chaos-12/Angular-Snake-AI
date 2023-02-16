import { Robot, Tolerances } from "src/main/data";

export abstract class RobotLogic {
  abstract buildRobot(tolerances:Tolerances):Robot;

  abstract makeRobotDecide(robot:Robot):void;
}
