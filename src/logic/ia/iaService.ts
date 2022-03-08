import { Board, Direction, Directions, Network } from "../index";

export class IaService {

  public static readonly indexFood = 0;
  public static readonly indexWall = 4;
  public static readonly indexBody = 8;

  public provideInput(board:Board):Array<number>{
    let input = new Array<number>(12);
    let snakeHead = board.snake.head;
    //1 if the food is in that direction // 0 otherwise
    if (snakeHead.x < board.food.x){
      input[IaService.indexFood + Direction.east] = 1;
    }
    if (snakeHead.x > board.food.x){
      input[IaService.indexFood + Direction.west] = 1;
    }
    if (snakeHead.y < board.food.y){
      input[IaService.indexFood + Direction.south] = 1;
    }
    if (snakeHead.y > board.food.y){
      input[IaService.indexFood + Direction.north] = 1;
    }
    //1 if there is a wall in that direction // 0 otherwise
    Directions.forEach(direction => {
      if (!board.contains(snakeHead.forward(direction))){
        input[IaService.indexWall + direction] = 1;
      }
    })
    //1 if there is a body in that direction // 0 otherwise
    Directions.forEach(direction => {
      if (board.snake.contains(snakeHead.forward(direction))){
        input[IaService.indexBody + direction] = 1;
      }
    })
    return input;
  }

  public getDirection(value:number):Direction{
    return Directions[value];
  }
}
