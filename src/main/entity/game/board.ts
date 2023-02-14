import { Food, Position, PositionSetList, Snake } from "src/main/entity";

export class Board {

  public rocks:PositionSetList = new PositionSetList();

  constructor(
    public snake:Snake,
    public food:Food,
    public width:number=11){ }

  public contains(position:Position):boolean{
    if(1<=position.x && position.x<=this.width && 1<=position.y && position.y<=this.width){
      return true;
    }
    return false;
  }

  public hasObstacleIn(position:Position):boolean{
    if(!this.contains(position)){
      return true;
    }
    if(this.rocks.contains(position)){
      return true;
    }
    if(this.snake.contains(position)){
      return true;
    }
    return false;
  }
}
