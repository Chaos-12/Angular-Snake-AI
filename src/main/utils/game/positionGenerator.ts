import { Position, PositionSetList } from "src/main/entity";
import { Predicate } from "src/main/interface";
import { RandomUtils } from "src/main/utils";

export class PositionGenerator {

  private exceptionMap:PositionSetList = new PositionSetList();
  private validPositions:Array<Position> = new Array<Position>();

  constructor() { }

  public addException(position:Position):void{
    this.exceptionMap.add(position);
  }

  public isValidPosition(position:Position):boolean{
    return !this.exceptionMap.contains(position);
  }

  public generateValidPositions(minX:number, maxX:number, minY:number, maxY:number, filter:Predicate<Position> = (position:Position) => true):void{
    this.validPositions = new Array<Position>();
    for(let x=minX; x<=maxX; x++){
      for(let y=minY; y<=maxY; y++){
        let newPosition = new Position(x,y);
        if (filter(newPosition) && this.isValidPosition(newPosition)){
          this.validPositions.push(newPosition);
        }
      }
    }
  }

  public getRandom():Position{
    return RandomUtils.getRandomFrom(this.validPositions);
  }
}
