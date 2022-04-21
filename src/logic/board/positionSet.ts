import { Position } from "src/logic";

export class PositionSet {

  private exceptionMap:Map<number,Set<number>> = new Map<number, Set<number>>();
  public validPositions:Array<Position> = new Array<Position>();

  constructor() { }

  public addException(position:Position):void{
    let exceptionSet = this.exceptionMap.get(position.x);
    if (exceptionSet === undefined){
      exceptionSet = new Set();
    }
    exceptionSet.add(position.y);
    this.exceptionMap.set(position.x, exceptionSet);
  }

  public isValidPosition(position:Position):boolean{
    let exceptionSet = this.exceptionMap.get(position.x);
    if (exceptionSet === undefined){
      return true;
    }
    if (exceptionSet.has(position.y)){
      return false;
    }
    return true;
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
