import { Direction, Information, InputType, InputTypes } from "src/main/data";
import { AutoList } from "./autoList";

export class Input extends AutoList<Information> {

  constructor(){
    super(new Information(), InputTypes);
  }

  public getInfo(inputType:InputType, direction:Direction):number{
    return this.getValue(inputType).getValue(direction);
  }
}
