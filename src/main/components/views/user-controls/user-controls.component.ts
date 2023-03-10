import { Component, Input } from "@angular/core";
import { Direction, Snake } from "src/main/data";
import { Consumer } from "src/main/interface";
import { SnakeLogic } from "src/main/services";

@Component({
  selector: 'app-user-controls',
  templateUrl: './user-controls.component.html',
  styleUrls: ['./user-controls.component.css']
})
export class UserControlsComponent {

  public readonly directions = Direction;

  @Input()
  public snake!:Snake;

  @Input()
  public keyMap:Map<string, Direction> = new Map();

  constructor(private snakeLogic:SnakeLogic){ }

  ngOnInit():void{
    window.addEventListener('keydown', this.keyPress, false);
  }

  ngOnDestroy():void{
    window.removeEventListener('keydown', this.keyPress, false);
  }

  private keyPress: Consumer<KeyboardEvent> = (e:KeyboardEvent) => {
    let direction = this.keyMap.get(e.key);
    if (direction != undefined){
      this.changeSnakeDirection(direction);
    }
  }

  public changeSnakeDirection(direction:Direction):void{
    this.snakeLogic.directSnake(this.snake, direction);
  }

}
