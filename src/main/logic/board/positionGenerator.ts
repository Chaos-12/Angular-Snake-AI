import { Position, PositionSetList } from "src/main/logic";

export class PositionGenerator {

  private exceptionMap:PositionSetList = new PositionSetList();
  public validPositions:Array<Position> = new Array<Position>();

  constructor() { }

  public addException(position:Position):void{
    this.exceptionMap.add(position);
  }

  public isValidPosition(position:Position):boolean{
    return !this.exceptionMap.contains(position);
  }

  public generateValidPositions(minX:number, maxX:number, minY:number, maxY:number, filter:(position:Position) => boolean = (position:Position) => true):void{
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
    let index = Math.floor(Math.random()*this.validPositions.length);
    return this.validPositions[index];
  }
}
