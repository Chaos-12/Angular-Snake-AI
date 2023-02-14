import { Robot } from "src/main/entity";

export abstract class RobotLogic {
  abstract makeAiDecide(ai:Robot):void;
}
