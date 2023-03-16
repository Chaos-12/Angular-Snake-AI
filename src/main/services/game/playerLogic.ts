import { Injectable } from "@angular/core";
import { Player } from "src/main/data";
import { BoardLogic, SnakeLogic } from "src/main/services";

@Injectable()
export class PlayerLogic {

  constructor(
    private boardLogic:BoardLogic,
    private snakeLogic:SnakeLogic){ }

  public buildPlayer(id:string):Player{
    let board = this.boardLogic.buildBoard();
    let snake = this.snakeLogic.buildSnake();
    this.boardLogic.addSnake(board, snake);
    this.boardLogic.generateFoodFor(board);
    return new Player(id, board, snake);
  }

  public nextMove(player:Player):void{
    this.boardLogic.moveSnakeInside(player.board, player.snake);
  }

  public reset(player:Player):void{
    this.boardLogic.resetBoard(player.board);
  }
}
