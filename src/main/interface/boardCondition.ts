import { Board, Position } from "src/main/entity";

export interface BoardCondition {
  (positionToCheck:Position, boardToCheck:Board):boolean;
}
