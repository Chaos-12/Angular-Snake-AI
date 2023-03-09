import { Injectable } from "@angular/core";
import { Board, Direction, Directions, Information, RobotInput, InputType, Position } from "src/main/data";
import { BiPredicate } from "src/main/interface";
import { PositionLogic } from "src/main/services";

@Injectable()
export class InputLogic {

  constructor(private positionLogic:PositionLogic){ }

  public buildInput(board:Board, position:Position):RobotInput{
    let distances = new RobotInput();
    //distances.setValue(InputType.food, this.getDistancesUntilCondition(board, position, this.positionLogic.hasFoodIn));
    distances.setValue(InputType.food, this.getDistancesToFood(board, position));
    distances.setValue(InputType.body, this.getDistancesUntilCondition(board, position, this.positionLogic.hasSnakeIn));
    distances.setValue(InputType.wall, this.getDistancesUntilCondition(board, position, this.positionLogic.isPositionOutside));
    distances.setValue(InputType.rock, this.getDistancesUntilCondition(board, position, this.positionLogic.hasRockIn));
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
        } else if (this.positionLogic.isPositionOutside(board, position)) {
          searching = false;
          distances.setValue(direction, 0);
        }
      }
    }
    return distances;
  }
}
