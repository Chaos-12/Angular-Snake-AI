import { Injectable } from "@angular/core";
import { Snake, Food, SnakeDeath, Direction, OppositeDirection, Position, PositionSetList } from "src/main/entity";
import { SnakeLogic } from "src/main/logic";

@Injectable()
export class SnakeLogicImpl extends SnakeLogic {

  public buildSnake(): Snake {
    let snake = new Snake();
    this.resetSnake(snake, length);
    return snake;
  }

  public feedSnake(snake:Snake, food:Food): void{
    snake.nFoodEaten ++;
    snake.score += food.score;
    snake.energy += food.energy;
    if (snake.energy > Snake.maxEnergy){
      snake.energy = Snake.maxEnergy;
    }
  }

  public moveSnake(snake:Snake, food:Food): void {
    if(!snake.isAlive){
      return;
    }
    snake.body.add(snake.head);
    snake.head = snake.nextPosition;
    snake.lastDirection = snake.direction;
    if(food.isInPosition(snake.head)){
      this.feedSnake(snake, food);
    } else {
      snake.body.removeFirst();
      snake.energy --;
    }
    if(snake.energy < 0){
      this.killSnake(snake, SnakeDeath.hunger);
    }
    snake.nStepTaken ++;
    snake.score ++;
  }

  public killSnake(snake:Snake, deathReason:SnakeDeath): void {
    snake.deathReason = deathReason;
    if(snake.record < snake.score){
      snake.record = snake.score;
    }
  }

  public resetSnake(snake:Snake, length:number = 3): void {
    snake.deathReason = SnakeDeath.none;
    snake.nStepTaken = 0;
    snake.nFoodEaten = 0;
    snake.energy = Snake.maxEnergy;
    snake.lastDirection = Direction.east;
    snake.direction = Direction.east;
    snake.head = new Position(length,1);
    snake.body = new PositionSetList();
    for(let i=1; i<length;i++){
      snake.body.add(new Position(i,1));
    }
  }

  public directSnake(snake:Snake, direction:Direction): void {
    if(!snake.isAlive){
      return;
    }
    if(OppositeDirection[direction] === snake.lastDirection){
      return;
    }
    snake.direction = direction;
  }

}
