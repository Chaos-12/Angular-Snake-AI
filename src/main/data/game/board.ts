import { Food, PositionSetList, Snake } from "src/main/data";

export class Board {

  public rocks:PositionSetList = new PositionSetList();

  constructor(
    public snake:Snake,
    public food:Food,
    public width:number=11){ }
}
