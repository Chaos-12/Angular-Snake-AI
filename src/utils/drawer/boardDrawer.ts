import { Injectable } from "@angular/core";
import { Board, Position } from "src/logic";
import { BaseDrawer } from "../index";

@Injectable()
export class BoardDrawer {

  constructor(){
  }

  public drawBoard(parent:HTMLElement, board:Board){
    parent.innerHTML = '';
    this.drawDiv(parent, board.food, ['food']);
    this.drawDiv(parent, board.snake.head, ['snake', 'snake-head', `rotate${board.snake.direction*90}`]);
    board.snake.body.forEach(part => {
      this.drawDiv(parent, part, ['snake', 'snake-body']);
    });
  }

  public drawDiv(parent:HTMLElement, position:Position, classes:string[]){
    const element = document.createElement('div');
    element.style.gridColumn = position.x.toString();
    element.style.gridRow = position.y.toString();
    classes.forEach(text => {
      element.classList.add(text);
    })
    parent.appendChild(element);
  }
}
