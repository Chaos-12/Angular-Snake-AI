import { Injectable } from "@angular/core";
import { Board, Food, Snake, SnakeDeath } from "src/main/data";
import { PositionLogic, SnakeLogic } from "src/main/services";

@Injectable()
export class BoardLogic {

  constructor(
    private snakeLogic:SnakeLogic,
    private positionLogic:PositionLogic){ }

  public buildBoard(width:number = 11):Board{
    let board = new Board(width);
    return board;
  }

  public addSnake(board:Board, snake:Snake):void{
    board.snakeList.push(snake);
  }

  public resetBoard(board:Board):void{
    board.snakeList.forEach( snake => this.snakeLogic.resetSnake(snake));
    board.rocks.reset();
    board.posibleRocks = [];
    board.isOver = false;
  }

  public moveSnakeInside(board:Board, snake:Snake):void{
    let newSnakePosition = snake.nextPosition;
    if(this.positionLogic.isPositionOutside(board, newSnakePosition)){
      this.killSnake(board, snake, SnakeDeath.wall);
    }
    if(this.positionLogic.hasRockIn(board, newSnakePosition)){
      this.killSnake(board, snake, SnakeDeath.rock);
    }
    if(this.positionLogic.hasSnakeIn(board, newSnakePosition)){
      this.killSnake(board, snake, SnakeDeath.bite);
    }

    this.snakeLogic.moveSnake(snake, board.food);

    if(this.positionLogic.hasFoodIn(board, newSnakePosition)){
      this.generateRockFor(board);
      this.generateFoodFor(board);
    }
  }

  public killSnake(board:Board, snake:Snake, deathReason:SnakeDeath):void{
    this.snakeLogic.killSnake(snake, deathReason);
    let someSnakeAlive = false;
    for (let snake of board.snakeList){
      if (snake.isAlive){
        someSnakeAlive = true;
      }
    }
    if (!someSnakeAlive){
      board.isOver = true;
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
