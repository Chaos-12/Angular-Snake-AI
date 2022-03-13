import { Injectable } from "@angular/core";
import { Position } from "src/logic";

@Injectable()
export class BaseDrawer {

constructor(){ }

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
