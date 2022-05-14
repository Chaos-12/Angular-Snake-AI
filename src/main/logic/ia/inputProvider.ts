import { Injectable } from "@angular/core";
import { Board, Direction, Directions, Position } from "src/main/logic";

@Injectable()
export class InputProvider {

  public static readonly indexFood = 0;
  public static readonly indexWall = 4;
  public static readonly indexBody = 8;

  public getInputFrom(board:Board):Array<number>{
    return this.getBinaryInput(board);
  }

  public getBinaryInput(board:Board):Array<number>{
    let inputs = new Array<number>(12);
    for(let i=0; i<12; i++){
      inputs[i]=0;
    }
    let snakeHead = board.snake.head;
    //1 if the food is in that direction // 0 otherwise
    if (snakeHead.x < board.food.x){
      inputs[InputProvider.indexFood + Direction.east] = 1;
    }
    if (snakeHead.x > board.food.x){
      inputs[InputProvider.indexFood + Direction.west] = 1;
    }
    if (snakeHead.y < board.food.y){
      inputs[InputProvider.indexFood + Direction.south] = 1;
    }
    if (snakeHead.y > board.food.y){
      inputs[InputProvider.indexFood + Direction.north] = 1;
    }
    //1 if there is a wall/rock in that direction // 0 otherwise
    Directions.forEach(direction => {
      if (!board.contains(snakeHead.forward(direction))){
        inputs[InputProvider.indexWall + direction] = 1;
      }
      if(board.hasRockIn(snakeHead.forward(direction))){
        inputs[InputProvider.indexBody + direction] = 1;
      }
    })
    //1 if there is a body in that direction // 0 otherwise
    Directions.forEach(direction => {
      if (board.snake.contains(snakeHead.forward(direction))){
        inputs[InputProvider.indexBody + direction] = 1;
      }
    })
    return inputs;
  }

  public distanceHeadToFood(board:Board):Array<number>{
    let distances = new Array<number>(4);
    distances[Direction.east] = board.food.x - board.snake.head.x;
    distances[Direction.west] = -distances[Direction.east];
    distances[Direction.south] = board.food.y - board.snake.head.y;
    distances[Direction.north] = -distances[Direction.south];
    distances.map( value => Math.max(0, value) );
    return distances;
  }

  public distanceHeadToWall(board:Board):Array<number>{
    let distances = new Array<number>(Directions.length);
    for(let dir=0; dir<Directions.length; dir++){
      let searching = true;
      let distance = 0;
      let position = board.snake.head;
      while(searching){
        distance ++;
        position = position.forward(dir);
        if(board.hasRockIn(position) || !board.contains(position)){
          searching = false;
          distances[dir] = distance;
        }
      }
    }
    return distances;
  }
}
