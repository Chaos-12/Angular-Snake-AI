import { Board, Snake } from "src/main/entity";

export abstract class BoardLogic {
  abstract buildBoard():Board;

  abstract resetBoard(board:Board):void;
  abstract moveSnakeInside(board:Board, snake:Snake):void;
  abstract generateFoodFor(board:Board):void;
  abstract generateRockFor(board:Board):void;
}
