import { Food, Position, PositionSetList, Snake } from "src/main/data";

export class Board {

  public snakeList:Array<Snake> = [];
  public food:Food = new Food();
  public rocks:PositionSetList = new PositionSetList();
  public posibleRocks:Array<Position> = [];

  public isOver:boolean = false;

  constructor(public width:number){ }
}
