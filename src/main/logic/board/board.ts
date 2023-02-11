import { Food } from "src/main/entity";
import { SnakeDeath } from "src/main/enum";
import { Position, PositionSetList, Snake } from "src/main/logic";
import { BoardItemGenerator } from "src/main/utils";

export class Board {

  public food:Food;
  public rocks:PositionSetList = new PositionSetList();

  constructor(public snake:Snake, public width:number=11){
    this.food = BoardItemGenerator.generateRandomFood(this);
  }

  public reset(){
    this.snake.reset();
    BoardItemGenerator.generateRandomFood(this);
    this.rocks.removeAll();
  }

  public contains(position:Position):boolean{
    if(1<=position.x && position.x<=this.width && 1<=position.y && position.y<=this.width){
      return true;
    }
    return false;
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
    if(this.food.isInPosition(newPosition)){
      this.snake.move(true);
      this.food = BoardItemGenerator.generateRandomFood(this);
      BoardItemGenerator.generateRandomRock(this);
    } else {
      this.snake.move(false);
    }
  }
}
