import { Injectable } from "@angular/core";
import { Board, Direction, Position } from "src/main/data";
import { ArrayUtils, RandomUtils } from "src/main/utils";

@Injectable()
export class PositionLogic {

  public isPositionOutside(board:Board, position:Position):boolean{
    return position.x < 1 || board.width < position.x || position.y < 1 || board.width < position.y;
  }

  public hasRockIn(board:Board, position:Position):boolean{
    return board.rocks.contains(position);
  }

  public hasSnakeIn(board:Board, position:Position):boolean{
    let containsSnake = false;
    board.snakeList.forEach( snake => {
      if( snake.head.equals(position)){
        containsSnake = true;
      }
      if( snake.body.contains(position)){
        containsSnake = true;
      }
    })
    return containsSnake;
  }

  public hasFoodIn(board:Board, position:Position):boolean{
    return board.food.isIn(position);
  }

  public isPositionFree(board:Board, position:Position):boolean{
    return !this.isPositionOutside(board, position)
          && !this.hasSnakeIn(board, position)
          && !this.hasRockIn(board, position);
  }

  public findFoodPosition(board:Board):Position|undefined{
    let x = RandomUtils.getRandomInt(board.width) +1;
    let y = RandomUtils.getRandomInt(board.width) +1;
    let foodPosition = new Position(x,y);
    let numberBoxes = board.width * board.width;
    for (let tries=0; tries < numberBoxes; tries++){
      if(this.isPositionFree(board, foodPosition)){
        return foodPosition;
      }
      foodPosition = foodPosition.forward(Direction.south);
      if(this.isPositionOutside(board, foodPosition)){
        x = foodPosition.x;
        y = foodPosition.y;
        if (y > board.width){
          foodPosition = new Position(x+1, 1);
        }
        if (x > board.width){
          foodPosition = new Position(1,1);
        }
      }
    }
    return undefined;
  }

  public findRockPosition(board:Board):Position|undefined{
    let rockLength = board.posibleRocks.length;
    if (rockLength == 0){
      if(board.rocks.length > 0){
        return undefined;
      }
      this.generateRockPositions(board);
      rockLength = board.posibleRocks.length;
    }
    let startingIndex = RandomUtils.getRandomInt(rockLength);
    let rockPosition;
    for (let index=startingIndex; index < rockLength; index ++){
      rockPosition = board.posibleRocks[index];
      if(this.isPositionFree(board, rockPosition)){
        ArrayUtils.removeAtIndex(board.posibleRocks, index);
        return rockPosition;
      }
    }
    for (let index=0; index < startingIndex; index ++){
      rockPosition = board.posibleRocks[index];
      if(this.isPositionFree(board, rockPosition)){
        ArrayUtils.removeAtIndex(board.posibleRocks, index);
        return rockPosition;
      }
    }
    return undefined;
  }

  private generateRockPositions(board:Board):void{
    let rockPositions = [];
    let minimum = 2;
    let maximum = 10;
    let medium = 6;
    rockPositions.push(new Position(medium, medium));
    for (let index=0; index < medium; index += 2){
      rockPositions.push(new Position(minimum+index, minimum+index));
      rockPositions.push(new Position(minimum+index, maximum-index));
      rockPositions.push(new Position(maximum-index, minimum+index));
      rockPositions.push(new Position(maximum-index, maximum-index));
      for (let aux=1; minimum + index + aux < medium; aux ++){
        let addition = index + aux;
        rockPositions.push(new Position(minimum+addition, minimum+index));
        rockPositions.push(new Position(minimum+addition, maximum-index));
        rockPositions.push(new Position(maximum-addition, minimum+index));
        rockPositions.push(new Position(maximum-addition, maximum-index));
        rockPositions.push(new Position(minimum+index, minimum+addition));
        rockPositions.push(new Position(minimum+index, maximum-addition));
        rockPositions.push(new Position(maximum-index, minimum+addition));
        rockPositions.push(new Position(maximum-index, maximum-addition));
      }
    }
    board.posibleRocks = rockPositions;
  }

}
