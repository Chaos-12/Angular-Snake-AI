import { Injectable } from "@angular/core";
import { Board, Direction, Directions, Information, Input, InputType, Position } from "src/main/data";
import { BiPredicate } from "src/main/interface";
import { BoardLogic } from "src/main/services";

@Injectable()
export class InputLogic {

  constructor(private boardLogic:BoardLogic){ }

  public buildInput(board:Board, position:Position):Input{
    let distances = new Input();
    //distances.setValue(InputType.food, this.getDistancesUntilCondition(board, position, this.boardLogic.hasFoodIn));
    distances.setValue(InputType.food, this.getDistancesToFood(board, position));
    distances.setValue(InputType.body, this.getDistancesUntilCondition(board, position, this.boardLogic.hasSnakeIn));
    distances.setValue(InputType.wall, this.getDistancesUntilCondition(board, position, this.boardLogic.isPositionOutside));
    distances.setValue(InputType.rock, this.getDistancesUntilCondition(board, position, this.boardLogic.hasRockIn));
    return distances.invertValues(board.width);
  }

  public getDistancesToFood(board:Board, initialPosition:Position):Information {
    let foodDistances = new Information();
    let horizontal = board.food.position.x - initialPosition.x;
    foodDistances.setValue(Direction.east, horizontal);
    foodDistances.setValue(Direction.west, -horizontal);
    let vertical = board.food.position.y - initialPosition.y;
    foodDistances.setValue(Direction.south, vertical);
    foodDistances.setValue(Direction.north, -vertical);
    return foodDistances;
  }

  public getDistancesUntilCondition(board:Board, initialPosition:Position, condition:BiPredicate<Board, Position>):Information {
    let distances = new Information();
    for (let direction of Directions){
      let searching = true;
      let distance = 0;
      let position = initialPosition;
      while(searching){
        distance ++;
        position = position.forward(direction);
        if (condition(board, position)) {
          searching = false;
          distances.setValue(direction, distance);
        } else if (this.boardLogic.isPositionOutside(board, position)) {
          searching = false;
          distances.setValue(direction, 0);
        }
      }
    }
    return distances;
  }
}
