import { Board, Direction, OppoisiteDirection, Position, PositionSetList, SnakeDeath } from "src/main/logic";

export class Snake {

  private static readonly foodEnergy:number = 100;
  public energy:number = Snake.foodEnergy;

  private successfulSteps:number = 0;
  get nSteps():number{
    return this.successfulSteps;
  }
  private nFoodEaten:number = 0;
  get nFood():number{
    return this.nFoodEaten;
  }
  get score(){
    return this.successfulSteps + this.nFoodEaten*100;
  }
  private myRecord:number = 0;
  get record(){
    return this.myRecord;
  }

  private lastDirection:Direction = Direction.east;
  private nextDirection:Direction = this.lastDirection;
  get direction():Direction{
    return this.nextDirection;
  }

  public head:Position = new Position(1,1);
  public body:PositionSetList = new PositionSetList();
  get length():number{
    return this.body.length+1;
  }

  private death:SnakeDeath|undefined = undefined;
  get isAlive():boolean{
    return this.death === undefined;
  }
  get deathReason():string{
    if (this.death === undefined) {
      return '';
    }
    return this.death.toString();
  }

  constructor(length:number = 3){
    this.reset(length);
  }

  public reset(length:number = 3):void{
    this.death = undefined;
    this.successfulSteps = 0;
    this.nFoodEaten = 0;
    this.energy = Snake.foodEnergy;
    this.lastDirection = Direction.east;
    this.nextDirection = Direction.east;
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
    this.head = this.head.forward(this.nextDirection);
    this.lastDirection = this.nextDirection;
    if(eating){
      this.nFoodEaten ++;
      this.energy = Snake.foodEnergy;
    } else {
      this.body.removeFirst();
      this.energy --;
    }
    this.successfulSteps ++;

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
    return OppoisiteDirection[direction] === this.lastDirection;
  }

  public lookTo(direction:Direction):void{
    if(!this.isAlive){
      return;
    }
    if(this.isOppositeDirection(direction)){
      return;
    }
    this.nextDirection = direction;
  }

  public kill(reason:SnakeDeath):void{
    this.death = reason;
    if(this.myRecord < this.score){
      this.myRecord = this.score;
    }
  }

}
