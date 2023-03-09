import { Food, Position, PositionSetList, Snake } from "src/main/data";

export class Board {

  public rocks:PositionSetList = new PositionSetList();
  public posibleRocks:Array<Position> = [];

  constructor(
    public snake:Snake,
    public food:Food,
    public width:number=11){ }
}
