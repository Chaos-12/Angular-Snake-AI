import { Injectable } from "@angular/core";
import { Board, Food, Snake, SnakeDeath } from "src/main/entity";
import { BoardLogic, SnakeLogic } from "src/main/logic";
import { PositionGenerator } from "src/main/utils";

@Injectable()
export class BoardLogicImpl extends BoardLogic {

  constructor(private snakeLogic:SnakeLogic){
    super();
  }

  public buildBoard():Board{
    let snake = this.snakeLogic.buildSnake();
    let board = new Board(snake, new Food());
    this.generateFoodFor(board);
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

    if(board.food.isIn(newSnakePosition)){
      this.generateFoodFor(board);
      this.generateRockFor(board);
    }
  }

  public generateFoodFor(board:Board):void{
    let foodPositions = new PositionGenerator();
    this.addExceptions(foodPositions, board);
    foodPositions.generateValidPositions(1, board.width, 1, board.width);
    let newFood = new Food(foodPositions.getRandom());
    board.food = newFood;
  }

  public generateRockFor(board:Board):void{
    let rockPositions = new PositionGenerator();
    this.addExceptions(rockPositions, board);
    rockPositions.generateValidPositions(1, board.width, 1, board.width);
    board.rocks.add(rockPositions.getRandom());
  }

  private addExceptions(positionGenerator:PositionGenerator, board:Board):void{
    positionGenerator.addException(board.food.position);
    board.rocks.forEach( rock => positionGenerator.addException(rock));
    positionGenerator.addException(board.snake.head);
    board.snake.body.forEach ( part => positionGenerator.addException(part));
  }
}
