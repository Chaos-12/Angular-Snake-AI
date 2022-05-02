import { Position, Board, PositionGenerator } from "src/logic";

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
    let foodPositions = new PositionGenerator();
    foodPositions.addException(board.snake.head);
    board.snake.body.forEach(part => {
      foodPositions.addException(part);
    });
    board.rocks.forEach(rock => {
      foodPositions.addException(rock);
    });
    foodPositions.generateValidPositions(1,board.width,1,board.height);
    board.food = foodPositions.getRandom();
  }

  public static generateRandomRock(board:Board):void{
    let rockPositions = new PositionGenerator();
    rockPositions.addException(board.food);
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
    rockPositions.generateValidPositions(1,board.width,1,board.height, evenFilter);
    board.rocks.add(rockPositions.getRandom());
  }
}
