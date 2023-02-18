import { Direction, InfoType } from "src/main/data";

export class Information {

  public south:number = 0;
  public west:number = 0;
  public north:number = 0;
  public east:number = 0;

  public getValue(direction:Direction):number{
    switch(direction){
      case Direction.north:
        return this.north;
      case Direction.south:
        return this.south;
      case Direction.east:
        return this.east;
      case Direction.west:
        return this.west;
      default:
        return 0;
    }
  }

  public setValue(direction:Direction, value:number):void{
    switch(direction){
      case Direction.north:
        this.north = value;
        break;
      case Direction.south:
        this.south = value;
        break;
      case Direction.east:
        this.east = value;
        break;
      case Direction.west:
        this.west = value;
        break;
    }
  }
}
