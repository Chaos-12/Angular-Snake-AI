import { Direction, Directions } from "src/main/data";

export class Position {

  constructor(public x:number, public y:number){ }

  public equals(other:Position):boolean{
    if(this.x === other.x && this.y === other.y){
      return true;
    }
    return false;
  }

  public forward(direction:Direction):Position{
    switch(direction){
      case Direction.north:
        return new Position(this.x, this.y -1);
      case Direction.east:
        return new Position(this.x +1, this.y);
      case Direction.south:
        return new Position(this.x, this.y +1);
      case Direction.west:
        return new Position(this.x -1, this.y);
    }
  }

  public neighborhood():Set<Position>{
    let result = new Set<Position>();
    result.add(this);
    Directions.forEach(direction => {
      result.add(this.forward(direction));
    });
    return result;
  }
}
