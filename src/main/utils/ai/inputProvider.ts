import { Injectable } from "@angular/core";
import { Board, Direction, Directions, Input } from "src/main/data";
import { MathUtils } from "src/main/utils";
import { BiPredicate } from "src/main/interface";
import { Position } from "src/main/data";
import { BoardLogic, SnakeLogic } from "src/main/services";

@Injectable()
export class InputProvider {

  private readonly bodyCondition:BiPredicate<Board, Position> = (board:Board, position:Position) => this.snakeLogic.isPositionInSnake(board.snake, position);
  private readonly wallContidion:BiPredicate<Board, Position> = (board:Board, position:Position) => !this.boardLogic.isInBoard(board, position);
  private readonly rockCondition:BiPredicate<Board, Position> = (board:Board, position:Position) => board.rocks.contains(position);

  constructor(
    private boardLogic:BoardLogic,
    private snakeLogic:SnakeLogic){ }

  public getInputFrom(board:Board):Input{
    return this.getRegularInputFrom(board);
  }

  private getBinaryInput(board:Board):Input{
    let foodInput = this.getBinaryInputFood(board);
    let bodyInput = this.checkConditionNearHead(board, this.bodyCondition);
    let wallInput = this.checkConditionNearHead(board, this.wallContidion);
    let rockInput = this.checkConditionNearHead(board, this.rockCondition);
    return new Input(foodInput, bodyInput, rockInput, wallInput);
  }

  private getRegularInputFrom(board:Board):Input{
    let foodInput = this.getDistancesToFood(board).map(distance => MathUtils.invertValue(distance, board.width));
    let bodyInput = this.getRegularInput(board, this.bodyCondition);
    let wallInput = this.getRegularInput(board, this.wallContidion);
    let rockInput = this.getRegularInput(board, this.rockCondition);
    return new Input(foodInput, bodyInput, rockInput, wallInput);
  }

  public checkConditionNearHead(board:Board, condition:BiPredicate<Board, Position>):Array<number>{
    return Directions.map(direction => condition(board, board.snake.head.forward(direction)) ? 1 : 0);
  }

  public getDistancesToFood(board:Board):Array<number>{
    let distances = new Array<number>(4);
    distances[Direction.east] = board.food.position.x - board.snake.head.x;
    distances[Direction.west] = -distances[Direction.east];
    distances[Direction.south] = board.food.position.y - board.snake.head.y;
    distances[Direction.north] = -distances[Direction.south];
    distances.map( value => value > 0 ? value : 0 );
    return distances;
  }

  public getBinaryInputFood(board:Board):Array<number>{
    let inputs = new Array<number>(4);
    inputs[Direction.east] = board.snake.head.x < board.food.position.x ? 1 : 0;
    inputs[Direction.west] = board.snake.head.x > board.food.position.x ? 1 : 0;
    inputs[Direction.south] = board.snake.head.y < board.food.position.y ? 1 : 0;
    inputs[Direction.north] = board.snake.head.y > board.food.position.y ? 1 : 0;
    return inputs;
  }

  public getRegularInputFood(board:Board):Array<number>{
    return this.getDistancesToFood(board).map(distance => MathUtils.invertValue(distance, board.width));
  }

  public getRegularInput(board:Board, condition:BiPredicate<Board, Position>):Array<number>{
    return this.boardLogic.distancesUntilCondition(board, board.snake.head, condition).map(distance => MathUtils.invertValue(distance, board.width));
  }

}
