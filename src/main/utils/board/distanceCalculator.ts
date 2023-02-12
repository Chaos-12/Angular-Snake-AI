import { Injectable } from "@angular/core";
import { Directions } from "src/main/enum";
import { BoardCondition } from "src/main/interface";
import { Board, Position } from "src/main/logic";

@Injectable()
export class DistanceCalculator {

  public getDistancesUntilCondition(startPosition:Position, board:Board, condition:BoardCondition):Array<number>{
    let distances = new Array<number>(Directions.length);
    for(let dir of Directions){
      let searching = true;
      let distance = 0;
      let position = startPosition;
      while(searching){
        distance ++;
        position = position.forward(dir);
        if(condition(position, board)){
          searching = false;
          distances[dir] = distance;
        } else if (!board.contains(position)){
          searching = false;
          distances[dir] = 0;
        }
      }
    }
    return distances;
  }
}