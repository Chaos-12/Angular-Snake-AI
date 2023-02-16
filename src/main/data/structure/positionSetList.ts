import { Position } from "src/main/data";
import { Consumer } from "src/main/interface";

export class PositionSetList {

  private coordinateMap:Map<number,Set<number>> = new Map<number,Set<number>>();
  public list:Array<Position> = [];

  get length():number{
    return this.list.length;
  }

  public reset():void{
    this.coordinateMap = new Map<number,Set<number>>();
    this.list = [];
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

  public shift():Position|undefined{
    let firstPosition = this.list.shift();
    if(firstPosition){
      this.remove(firstPosition);
      return firstPosition;
    }
    return undefined;
  }

  public remove(position:Position):boolean{
    let yCoordinates = this.coordinateMap.get(position.x);
    if(!yCoordinates){
      return false;
    }
    return yCoordinates.delete(position.y);
  }

  public forEach(callback:Consumer<Position>):void{
    this.list.forEach(position => callback(position));
  }
}
