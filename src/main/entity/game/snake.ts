import { Direction, OppositeDirection, Position, PositionSetList, SnakeDeath } from "src/main/entity";

export class Snake {

  public static readonly initialEnergy:number = 100;

  public energy:number = Snake.initialEnergy;
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

  constructor(){ }

  public reset(length:number = 3):void{
    this.deathReason = SnakeDeath.none;
    this.nStepTaken = 0;
    this.nFoodEaten = 0;
    this.energy = Snake.initialEnergy;
    this.lastDirection = Direction.east;
    this.direction = Direction.east;
    this.head = new Position(length,1);
    this.body = new PositionSetList();
    for(let i=1; i<length;i++){
      this.body.add(new Position(i,1));
    }
  }

  public move(eating:boolean):void{
    if(!this.isAlive){
      return;
    }
    this.body.add(this.head);
    this.head = this.head.forward(this.direction);
    this.lastDirection = this.direction;
    if(eating){
      this.nFoodEaten ++;
      this.energy = Snake.initialEnergy;
    } else {
      this.body.removeFirst();
      this.energy --;
    }
    this.nStepTaken ++;

    if(this.energy < 0){
      this.kill(SnakeDeath.hunger);
    }
  }

  public contains(position:Position):boolean{
    if(this.head.equals(position)){
      return true;
    }
    return this.body.contains(position);
  }

  private isOppositeDirection(direction:Direction):boolean{
    return OppositeDirection[direction] === this.lastDirection;
  }

  public lookTo(direction:Direction):void{
    if(!this.isAlive){
      return;
    }
    if(this.isOppositeDirection(direction)){
      return;
    }
    this.direction = direction;
  }

  public kill(reason:SnakeDeath):void{
    this.deathReason = reason;
    if(this.record < this.score){
      this.record = this.score;
    }
  }

}
