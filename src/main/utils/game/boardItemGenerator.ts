import { Board, Food, Position } from "src/main/entity";
import { PositionGenerator } from "src/main/utils";

export class BoardItemGenerator {

  public static generateRandomFood(board:Board):Food{
    let foodPositions = new PositionGenerator();
    foodPositions.addException(board.snake.head);
    board.snake.body.forEach(part => {
      foodPositions.addException(part);
    });
    board.rocks.forEach(rock => {
      foodPositions.addException(rock);
    });
    foodPositions.generateValidPositions(1,board.width,1,board.width);
    return new Food(foodPositions.getRandom());
  }

  public static generateRandomRock(board:Board):void{
    let rockPositions = new PositionGenerator();
    rockPositions.addException(board.food.position);
    board.snake.head.neighborhood().forEach(position => {
      rockPositions.addException(position);
    });
    board.snake.body.forEach(part => {
      rockPositions.addException(part);
    });
    board.rocks.forEach(rock => {
      rockPositions.addException(rock);
    });
    let evenFilter = (position:Position) => (position.x%2===0 && position.y%2===0);
    rockPositions.generateValidPositions(1,board.width,1,board.width, evenFilter);
    board.rocks.add(rockPositions.getRandom());
  }
}
