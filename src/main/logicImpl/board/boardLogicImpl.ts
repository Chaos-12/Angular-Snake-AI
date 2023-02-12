import { Injectable } from "@angular/core";
import { Board, Snake, SnakeDeath } from "src/main/entity";
import { SnakeLogic } from "src/main/logic";

@Injectable()
export class boardLogicImpl {

  constructor(private snakeLogic:SnakeLogic){ }

  public buildBoard():Board{
    let snake = this.snakeLogic.buildSnake();
    let board = new Board(snake);
    return board;
  }

  public resetBoard(board:Board):void{
    this.snakeLogic.resetSnake(board.snake);
    board.rocks.removeAll();
  }

  public moveSnakeInside(board:Board, snake:Snake):void{
    let newSnakePosition = snake.nextPosition;
    if(!board.contains(newSnakePosition)){
      this.snakeLogic.killSnake(snake, SnakeDeath.wall);
    }
    if(board.rocks.contains(newSnakePosition)){
      this.snakeLogic.killSnake(snake, SnakeDeath.rock);
    }
    if(snake.contains(newSnakePosition)){
      this.snakeLogic.killSnake(snake, SnakeDeath.bite);
    }

    this.snakeLogic.moveSnake(snake, board.food);

    if(board.food.isInPosition(newSnakePosition)){
      this.generateFoodFor(board);
      this.generateRockFor(board);
    }
  }

  public generateFoodFor(board:Board):void{

  }

  public generateRockFor(board:Board):void{

  }
}
