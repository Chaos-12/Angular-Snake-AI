import { Injectable } from "@angular/core";
import { Board, Position } from "src/logic";

@Injectable()
export class BoardDrawer {

  public drawBoard(parent:Element, board:Board):void{
    parent.innerHTML = '';
    this.appendDiv(parent, board.food, ['food']);
    this.appendDiv(parent, board.snake.head, ['snake', 'snake-head', `rotate${board.snake.direction*90}`]);
    board.snake.body.forEach(part => {
      this.appendDiv(parent, part, ['snake', 'snake-body']);
    });
    board.rocks.forEach(rock => {
      this.appendDiv(parent, rock, ['rock']);
    })
  }

  private appendDiv(parent:Element, position:Position, classes:string[]):void{
    const element = document.createElement('div');
    element.style.gridColumn = position.x.toString();
    element.style.gridRow = position.y.toString();
    classes.forEach(text => {
      element.classList.add(text);
    })
    parent.appendChild(element);
  }
}
