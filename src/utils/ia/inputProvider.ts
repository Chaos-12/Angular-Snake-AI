import { Board, Direction, Directions } from "src/logic";

export class InputProvider {

  public static readonly indexFood = 0;
  public static readonly indexWall = 4;
  public static readonly indexBody = 8;

  public provideInput(board:Board):Array<number>{
    let input = new Array<number>(12);
    let snakeHead = board.snake.head;
    //1 if the food is in that direction // 0 otherwise
    if (snakeHead.x < board.food.x){
      input[InputProvider.indexFood + Direction.east] = 1;
    }
    if (snakeHead.x > board.food.x){
      input[InputProvider.indexFood + Direction.west] = 1;
    }
    if (snakeHead.y < board.food.y){
      input[InputProvider.indexFood + Direction.south] = 1;
    }
    if (snakeHead.y > board.food.y){
      input[InputProvider.indexFood + Direction.north] = 1;
    }
    //1 if there is a wall in that direction // 0 otherwise
    Directions.forEach(direction => {
      if (!board.contains(snakeHead.forward(direction))){
        input[InputProvider.indexWall + direction] = 1;
      }
    })
    //1 if there is a body in that direction // 0 otherwise
    Directions.forEach(direction => {
      if (board.snake.contains(snakeHead.forward(direction))){
        input[InputProvider.indexBody + direction] = 1;
      }
    })
    return input;
  }

  public getDirection(value:number):Direction{
    return Directions[value];
  }
}
