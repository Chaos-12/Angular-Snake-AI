import { Board, Position, Snake } from "src/main/data";
import { BiPredicate } from "src/main/interface";

export abstract class BoardLogic {
  abstract buildBoard():Board;
  abstract isInBoard(board:Board,position:Position):boolean;
  abstract hasObstacleIn(board:Board, position:Position):boolean;
  abstract resetBoard(board:Board):void;
  abstract moveSnakeInside(board:Board, snake:Snake):void;
  abstract generateFoodFor(board:Board):void;
  abstract generateRockFor(board:Board):void;
  abstract distancesUntilCondition(board:Board, from:Position, condition:BiPredicate<Board,Position>):Array<number>;
}
