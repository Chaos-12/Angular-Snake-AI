import { Direction, Food, Position, Snake, SnakeDeath } from "src/main/data";

export abstract class SnakeLogic {
  abstract buildSnake():Snake;

  abstract isInSnake(snake:Snake,position:Position):boolean;
  abstract feedSnake(snake:Snake,food:Food):void;
  abstract moveSnake(snake:Snake,food:Food):void;
  abstract killSnake(snake:Snake,reason:SnakeDeath):void;
  abstract resetSnake(snake:Snake):void;
  abstract directSnake(snake:Snake,direction:Direction):void;
}
