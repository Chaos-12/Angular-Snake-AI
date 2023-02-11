import { Position, Board } from "src/main/logic";

export interface BoardCondition {
  (positionToCheck:Position, boardToCheck:Board):boolean;
}
