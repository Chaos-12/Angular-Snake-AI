import { Direction, BoardPosition } from "./board";

export enum SnakeDeath {
  wall, bite
}

export class Snake {

  private successfulSteps:number=0;
  private nFoodEaten:number=0;
  get score(){
    return this.successfulSteps + this.nFoodEaten*100;
  }
  private record:number=0;
  get Record(){
    return this.record;
  }

  private lastDirection:Direction = Direction.east;
  private nextDirection:Direction = this.lastDirection;
  get direction():Direction{
    return this.nextDirection;
  }

  public head:BoardPosition = new BoardPosition(1,1);
  public body:BoardPosition[] = [];
  get length():number{
    return this.body.length+1;
  }

  private death:SnakeDeath|undefined = undefined;
  get isAlive():boolean{
    return this.death === undefined;
  }

  constructor(){
    this.reset();
  }

  public reset(length:number = 3):void{
    this.death = undefined;
    this.successfulSteps = 0;
    this.nFoodEaten = 0;
    this.lastDirection = Direction.east;
    this.nextDirection = this.lastDirection;
    this.head = new BoardPosition(length,1);
    this.body = [];
    for(let i=1; i<length;i++){
      this.body.push(new BoardPosition(i,1));
    }
  }

  public move(eating:boolean):void{
    if(!this.isAlive){
      return;
    }
    this.body.push(this.head);
    this.head = this.head.forward(this.nextDirection);
    this.lastDirection = this.nextDirection;
    if(eating){
      this.nFoodEaten ++;
    } else {
      this.body.shift();
    }
    this.successfulSteps ++;
  }

  public contains(position:BoardPosition):boolean{
    if(this.head.equals(position)){
      return true;
    }
    for(let i=0; i<this.body.length; i++){
      if(this.body[i].equals(position)){
        return true;
      }
    }
    return false;
  }

  public isOppositeDirection(direction:Direction):boolean{
    if(this.lastDirection - direction === 2){
      return true;
    }
    if(this.lastDirection - direction === -2){
      return true;
    }
    return false;
  }

  public newDirection(direction:Direction):void{
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
    if(this.record < this.score){
      this.record = this.score;
    }
  }

}