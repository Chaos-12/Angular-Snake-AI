import { Position, Snake, SnakeDeath } from "src/logic";

export class Board {
  public food:Position = new Position(this.width, this.height);

  constructor(public snake:Snake, public height:number=10, public width:number=10){
    this.generateRandomFood();
  }

  public generateRandomFood():void{
    let generated = false;
    while(!generated){
      let x = Math.ceil(Math.random()*this.width);
      let y = Math.ceil(Math.random()*this.height);
      let newPosition = new Position(x,y);
      if(!this.snake.contains(newPosition)){
        this.food = newPosition;
        generated = true;
      }
    }
  }

  public contains(position:Position):boolean{
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
