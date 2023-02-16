import { Direction, Position, PositionSetList, SnakeDeath } from "src/main/data";

export class Snake {

  public static readonly maxEnergy:number = 100;

  public energy:number = Snake.maxEnergy;
  public nStepTaken:number = 0;
  public nFoodEaten:number = 0;

  public score:number = 0;
  public record:number = 0;

  public deathReason:SnakeDeath = SnakeDeath.none;
  get isAlive():boolean{
    return SnakeDeath.none === this.deathReason;
  }

  public head:Position = new Position(1,1);
  public body:PositionSetList = new PositionSetList();
  get length():number{
    return this.body.length+1;
  }

  public lastDirection:Direction = Direction.east;
  public direction:Direction = this.lastDirection;
  get nextPosition():Position{
    return this.head.forward(this.direction);
  }
}
