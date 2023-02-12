import { Direction, Food, Snake, SnakeDeath } from "src/main/entity";

export abstract class SnakeLogic {
  abstract buildSnake():Snake;

  abstract feedSnake(snake:Snake,food:Food):void;
  abstract moveSnake(snake:Snake,food:Food):void;
  abstract killSnake(snake:Snake,reason:SnakeDeath):void;
  abstract resetSnake(snake:Snake):void;
  abstract directSnake(snake:Snake,direction:Direction):void;
}
