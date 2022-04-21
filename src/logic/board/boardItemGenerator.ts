import { Position, Board } from "src/logic";
import { PositionSet } from "./positionSet";

export class BoardItemGenerator {

  public static generateRandomFood(board:Board):void{
    /*let generated = false;
    let tries = 0;
    while(!generated && tries < 3){
      let x = Math.ceil(Math.random()*board.width);
      let y = Math.ceil(Math.random()*board.height);
      let newPosition = new Position(x,y);
      if(!board.snake.contains(newPosition)){
        board.food = newPosition;
        generated = true;
      }
      tries ++;
    }*/
    let foodPositions = new PositionSet();
    foodPositions.addException(board.snake.head);
    board.snake.body.forEach(position => {
      foodPositions.addException(position);
    });
    board.rocks.forEach(position => {
      foodPositions.addException(position);
    });
    foodPositions.generateValidPositions(1,board.width,1,board.height);
    board.food = foodPositions.getRandom();

  }

  public static generateRandomRock(board:Board):void{
    let rockPositions = new PositionSet();
    rockPositions.addException(board.food);
    board.snake.head.neighborhood().forEach(position => {
      rockPositions.addException(position);
    });
    board.snake.body.forEach(position => {
      rockPositions.addException(position);
    });
    board.rocks.forEach(position => {
      rockPositions.addException(position);
    });
    let evenFilter = (position:Position) => (position.x%2===0 && position.y%2===0);
    rockPositions.generateValidPositions(1,board.width,1,board.height, evenFilter);
    board.rocks.push(rockPositions.getRandom());
  }
}
