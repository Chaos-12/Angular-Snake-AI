import { Injectable } from "@angular/core";
import { Board, Direction, Directions, Position, Input } from "src/main/logic";

@Injectable()
export class InputProvider {

  public readonly bodyCondition = (board:Board, position:Position) => board.snake.contains(position);
  public readonly wallContidion = (board:Board, position:Position) => !board.contains(position);
  public readonly rockCondition = (board:Board, position:Position) => board.rocks.contains(position);

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
    let foodInput = this.getDistancesToFood(board).map(distance => this.invertValue(distance, board.width));
    let bodyInput = this.getRegularInput(board, this.bodyCondition);
    let wallInput = this.getRegularInput(board, this.wallContidion);
    let rockInput = this.getRegularInput(board, this.rockCondition);
    return new Input(foodInput, bodyInput, rockInput, wallInput);
  }

  public checkConditionNearHead(board:Board, condition:(board:Board, position:Position)=>Boolean):Array<number>{
    return Directions.map(direction => condition(board, board.snake.head.forward(direction)) ? 1 : 0);
  }

  public getDistancesToFood(board:Board):Array<number>{
    let distances = new Array<number>(4);
    distances[Direction.east] = board.food.x - board.snake.head.x;
    distances[Direction.west] = -distances[Direction.east];
    distances[Direction.south] = board.food.y - board.snake.head.y;
    distances[Direction.north] = -distances[Direction.south];
    distances.map( value => value > 0 ? value : 0 );
    return distances;
  }

  public getDistancesUntilCondition(board:Board, condition:(board:Board, position:Position)=>Boolean):Array<number>{
    let distances = new Array<number>(Directions.length);
    for(let dir of Directions){
      let searching = true;
      let distance = 0;
      let position = board.snake.head;
      while(searching){
        distance ++;
        position = position.forward(dir);
        if(condition(board, position)){
          searching = false;
          distances[dir] = distance;
        } else if(!board.contains(position)){
          searching = false;
          distances[dir] = 0;
        }
      }
    }
    return distances;
  }

  public getBinaryInputFood(board:Board):Array<number>{
    let inputs = new Array<number>(4);
    inputs[Direction.east] = board.snake.head.x < board.food.x ? 1 : 0;
    inputs[Direction.west] = board.snake.head.x > board.food.x ? 1 : 0;
    inputs[Direction.south] = board.snake.head.y < board.food.y ? 1 : 0;
    inputs[Direction.north] = board.snake.head.y > board.food.y ? 1 : 0;
    return inputs;
  }

  private invertValue(value:number, maximum:number):number{
    return value > 0 ? 1-(value/maximum) : 0;
  }

  public getRegularInputFood(board:Board):Array<number>{
    return this.getDistancesToFood(board).map(distance => this.invertValue(distance, board.width));
  }

  public getRegularInput(board:Board, condition:(board:Board, position:Position)=>Boolean):Array<number>{
    return this.getDistancesUntilCondition(board, condition).map(distance => this.invertValue(distance, board.width));
  }

}
