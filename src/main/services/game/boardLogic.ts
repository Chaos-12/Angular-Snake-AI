import { Injectable } from "@angular/core";
import { Board, Directions, Food, Position, Snake, SnakeDeath } from "src/main/data";
import { BiPredicate } from "src/main/interface";
import { SnakeLogic } from "src/main/services";
import { PositionGenerator } from "src/main/utils";

@Injectable()
export class BoardLogic {

  constructor(private snakeLogic:SnakeLogic){ }

  public buildBoard():Board{
    let snake = this.snakeLogic.buildSnake();
    let board = new Board(snake, new Food());
    this.generateFoodFor(board);
    return board;
  }

  public isPositionInBoard(board:Board, position:Position):boolean{
    return 1<=position.x && position.x<=board.width && 1<=position.y && position.y<=board.width;
  }

  public isPositionOutside(board:Board, position:Position):boolean{
    return position.x < 1 || board.width < position.x || position.y < 1 || board.width < position.y;
  }

  public hasRockIn(board:Board, position:Position):boolean{
    return board.rocks.contains(position);
  }

  public hasSnakeIn(board:Board, position:Position):boolean{
    return this.snakeLogic.isPositionInSnake(board.snake, position);
  }

  public hasFoodIn(board:Board, position:Position):boolean{
    return board.food.isIn(position);
  }

  public hasObstacleIn(board:Board, position:Position):boolean{
    return this.isPositionOutside(board, position)
          || this.hasSnakeIn(board, position)
          || this.hasRockIn(board, position);
  }

  public resetBoard(board:Board):void{
    this.snakeLogic.resetSnake(board.snake);
    board.rocks.reset();
  }

  public moveSnakeInside(board:Board, snake:Snake):void{
    let newSnakePosition = snake.nextPosition;
    if(this.isPositionOutside(board, newSnakePosition)){
      this.snakeLogic.killSnake(snake, SnakeDeath.wall);
    }
    if(this.hasRockIn(board, newSnakePosition)){
      this.snakeLogic.killSnake(snake, SnakeDeath.rock);
    }
    if(this.hasSnakeIn(board, newSnakePosition)){
      this.snakeLogic.killSnake(snake, SnakeDeath.bite);
    }

    this.snakeLogic.moveSnake(snake, board.food);

    if(this.hasFoodIn(board, newSnakePosition)){
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

  public distancesUntilCondition(board:Board, from:Position, condition:BiPredicate<Board,Position>):Array<number>{
    let distances = new Array<number>(Directions.length);
    for(let dir of Directions){
      let searching = true;
      let distance = 0;
      let position = from;
      while(searching){
        distance ++;
        position = position.forward(dir);
        if(condition(board, position)){
          searching = false;
          distances[dir] = distance;
        } else if (!this.isPositionInBoard(board, position)){
          searching = false;
          distances[dir] = 0;
        }
      }
    }
    return distances;
  }
}
