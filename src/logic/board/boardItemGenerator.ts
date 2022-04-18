import { Position, Board } from "src/logic";

export class BoardItemGenerator {

  public static generateRandomFood(board:Board):void{
    let generated = false;
    while(!generated){
      let x = Math.ceil(Math.random()*board.width);
      let y = Math.ceil(Math.random()*board.height);
      let newPosition = new Position(x,y);
      if(!board.snake.contains(newPosition)){
        board.food = newPosition;
        generated = true;
      }
    }
  }

  public static generateRandomRock(board:Board):void{

  }

}
