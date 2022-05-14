import { Position } from "src/main/logic";

export class PositionSetList {

  private coordinateMap:Map<number,Set<number>> = new Map<number,Set<number>>();
  private list:Array<Position> = [];

  constructor() { }

  public forEach(callback:(position:Position)=>void):void{
    this.list.forEach(position => callback(position));
  }

  public length():number{
    return this.list.length;
  }

  public contains(position:Position):boolean{
    let yCoordinates = this.coordinateMap.get(position.x);
    if(!yCoordinates){
      return false;
    }
    return yCoordinates.has(position.y);
  }

  public add(position:Position):void{
    let yCoordinates = this.coordinateMap.get(position.x);
    if(!yCoordinates){
      yCoordinates = new Set<number>();
    }
    if(!yCoordinates.has(position.y)){
      yCoordinates.add(position.y);
      this.coordinateMap.set(position.x, yCoordinates);
      this.list.push(position);
    }
  }

  public removeFirst():void{
    let firstPosition = this.list.shift();
    if(firstPosition){
      this.removeFromMap(firstPosition);
    }
  }

  private removeFromMap(position:Position):boolean{
    let yCoordinates = this.coordinateMap.get(position.x);
    if(!yCoordinates){
      return false;
    }
    return yCoordinates.delete(position.y);
  }

  public removeAll():void{
    this.coordinateMap = new Map<number,Set<number>>();
    this.list = [];
  }
}
