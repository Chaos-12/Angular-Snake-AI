import { Injectable } from "@angular/core";
import { Snake, Food, SnakeDeath, Direction, OppositeDirection, Position, PositionSetList } from "src/main/data";

@Injectable()
export class SnakeLogic {

  public buildSnake():Snake {
    let snake = new Snake();
    this.resetSnake(snake, 3);
    return snake;
  }

  public feedSnake(snake:Snake, food:Food):void {
    snake.nFoodEaten ++;
    snake.score += food.score;
    snake.energy += food.energy;
    if (snake.energy > Snake.maxEnergy){
      snake.energy = Snake.maxEnergy;
    }
  }

  public growSnake(snake:Snake):void {
    snake.body.add(snake.head);
    snake.head = snake.nextPosition;
  }

  public moveSnake(snake:Snake, food:Food):void {
    if(!snake.isAlive){
      return;
    }
    this.growSnake(snake);
    snake.lastDirection = snake.direction;
    if(food.isIn(snake.head)){
      this.feedSnake(snake, food);
    } else {
      snake.body.shift();
      snake.energy --;
    }
    snake.nStepTaken ++;
    snake.score ++;
  }

  public killSnake(snake:Snake, deathReason:SnakeDeath):void {
    snake.deathReason = deathReason;
    if(snake.record < snake.score){
      snake.record = snake.score;
    }
  }

  public resetSnake(snake:Snake, length:number = 3):void {
    snake.score = 0;
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

  public directSnake(snake:Snake, direction:Direction):void {
    if(!snake.isAlive){
      return;
    }
    if(OppositeDirection[direction] === snake.lastDirection){
      return;
    }
    snake.direction = direction;
  }

}
