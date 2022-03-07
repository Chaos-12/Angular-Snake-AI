import { Direction } from "../index";

export class BoardPosition {
  constructor(public x:number, public y:number){ }

  public equals(position:BoardPosition):boolean{
    if(this.x === position.x && this.y === position.y){
      return true;
    }
    return false;
  }

  public forward(direction:Direction):BoardPosition{
    switch(direction){
      case Direction.north:
        return new BoardPosition(this.x, this.y -1);
      case Direction.east:
        return new BoardPosition(this.x +1, this.y);
      case Direction.south:
        return new BoardPosition(this.x, this.y +1);
      case Direction.west:
        return new BoardPosition(this.x -1, this.y);
    }
    return this;
  }
}
