import { Injectable } from "@angular/core";
import { Board, Food, Snake, SnakeDeath } from "src/main/data";
import { PositionLogic, SnakeLogic } from "src/main/services";

@Injectable()
export class BoardLogic {

  constructor(
    private snakeLogic:SnakeLogic,
    private positionLogic:PositionLogic){ }

  public buildBoard():Board{
    let snake = this.snakeLogic.buildSnake();
    let board = new Board(snake, new Food());
    this.generateFoodFor(board);
    return board;
  }

  public resetBoard(board:Board):void{
    this.snakeLogic.resetSnake(board.snake);
    board.rocks.reset();
  }

  public moveSnakeInside(board:Board, snake:Snake):void{
    let newSnakePosition = snake.nextPosition;
    if(this.positionLogic.isPositionOutside(board, newSnakePosition)){
      this.snakeLogic.killSnake(snake, SnakeDeath.wall);
    }
    if(this.positionLogic.hasRockIn(board, newSnakePosition)){
      this.snakeLogic.killSnake(snake, SnakeDeath.rock);
    }
    if(this.positionLogic.hasSnakeIn(board, newSnakePosition)){
      this.snakeLogic.killSnake(snake, SnakeDeath.bite);
    }

    this.snakeLogic.moveSnake(snake, board.food);

    if(this.positionLogic.hasFoodIn(board, newSnakePosition)){
      this.generateRockFor(board);
      this.generateFoodFor(board);
    }
  }

  public generateFoodFor(board:Board):void{
    let foodPosition = this.positionLogic.findFoodPosition(board);
    if(foodPosition != undefined){
      board.food = new Food(foodPosition);
    }
  }

  public generateRockFor(board:Board):void{
    let rockPosition = this.positionLogic.findRockPosition(board);
    if(rockPosition != undefined){
      board.rocks.add(rockPosition);
    }
  }
}
