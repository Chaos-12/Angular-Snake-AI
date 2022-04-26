import { BoardItemGenerator, Position, Snake, SnakeDeath } from "src/logic";

export class Board {
  public food:Position = new Position(this.width, this.height);
  public rocks:Array<Position> = new Array();

  constructor(public snake:Snake, public height:number=11, public width:number=11){
    BoardItemGenerator.generateRandomFood(this);
  }

  public reset(){
    this.snake.reset();
    BoardItemGenerator.generateRandomFood(this);
    this.rocks = new Array();
  }

  public contains(position:Position):boolean{
    if(1<=position.x && position.x<=this.width && 1<=position.y && position.y<=this.height){
      return true;
    }
    return false;
  }

  public hasRockIn(position:Position):boolean{
    for(let i=0; i<this.rocks.length; i++){
      if(this.rocks[i].equals(position)){
        return true;
      }
    }
    return false;
  }

  public moveSnake():void{
    let newPosition = this.snake.head.forward(this.snake.direction);
    if(!this.contains(newPosition)){
      this.snake.kill(SnakeDeath.wall);
    }
    this.rocks.forEach(rock => {
      if(rock.equals(newPosition)){
        this.snake.kill(SnakeDeath.rock);
      }
    })
    if(this.snake.contains(newPosition)){
      this.snake.kill(SnakeDeath.bite);
    }
    if(this.food.equals(newPosition)){
      this.snake.move(true);
      BoardItemGenerator.generateRandomFood(this);
      BoardItemGenerator.generateRandomRock(this);
    } else {
      this.snake.move(false);
    }
  }
}
