import { BoardItemGenerator, Position, PositionSetList, Snake, SnakeDeath } from "src/main/logic";

export class Board {
  public food:Position = new Position(this.width, this.height);
  public rocks:PositionSetList = new PositionSetList();

  constructor(public snake:Snake, public height:number=11, public width:number=11){
    BoardItemGenerator.generateRandomFood(this);
  }

  public reset(){
    this.snake.reset();
    BoardItemGenerator.generateRandomFood(this);
    this.rocks.removeAll();
  }

  public contains(position:Position):boolean{
    if(1<=position.x && position.x<=this.width && 1<=position.y && position.y<=this.height){
      return true;
    }
    return false;
  }

  public hasRockIn(position:Position):boolean{
    return this.rocks.contains(position);
  }

  public moveSnake():void{
    let newPosition = this.snake.head.forward(this.snake.direction);
    if(!this.contains(newPosition)){
      this.snake.kill(SnakeDeath.wall);
    }
    if(this.rocks.contains(newPosition)){
      this.snake.kill(SnakeDeath.rock);
    }
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
