import { Snake, SnakeDeath } from "./snake";

export enum Direction {
  south = 0, west = 1, north = 2, east = 3,
}

export class BoardPosition {
  constructor(public x:number, public y:number){ }

  public equals(position:BoardPosition):boolean{
    if(this.x === position.x && this.y === position.y){
      return true;
    }
    return false;
  }

  public forward(direction:Direction):BoardPosition{
    switch(direction){
      case Direction.north:
        return new BoardPosition(this.x, this.y -1);
      case Direction.east:
        return new BoardPosition(this.x +1, this.y);
      case Direction.south:
        return new BoardPosition(this.x, this.y +1);
      case Direction.west:
        return new BoardPosition(this.x -1, this.y);
    }
  }
}

export class Board {
  public food:BoardPosition = new BoardPosition(this.width, this.height);

  constructor(private snake:Snake, public height:number=10, public width:number=10){
    this.generateRandomFood();
  }

  public generateRandomFood():void{
    let generated = false;
    while(!generated){
      let x = Math.ceil(Math.random()*this.width);
      let y = Math.ceil(Math.random()*this.height);
      let newPosition = new BoardPosition(x,y);
      if(!this.snake.contains(newPosition)){
        this.food = newPosition;
        generated = true;
      }
    }
  }

  public contains(position:BoardPosition):boolean{
    if(1<=position.x && position.x<=this.width && 1<=position.y && position.y<=this.height){
      return true;
    }
    return false;
  }

  public moveSnake():void{
    let newPosition = this.snake.head.forward(this.snake.direction);
    if(!this.contains(newPosition)){
      this.snake.kill(SnakeDeath.wall);
    }
    if(this.snake.contains(newPosition)){
      this.snake.kill(SnakeDeath.bite);
    }
    if(this.food.equals(newPosition)){
      this.snake.move(true);
      this.generateRandomFood();
    } else {
      this.snake.move(false);
    }
  }
}