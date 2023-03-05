import { Direction, Information, InputType, InputTypes } from "src/main/data";
import { Operation } from "src/main/interface";
import { AutoList } from "./autoList";

export class Input extends AutoList<Information> {

  constructor(){
    super(new Information(), InputTypes);
  }

  public getInfo(inputType:InputType, direction:Direction):number {
    return this.getValue(inputType).getValue(direction);
  }

  public override map(operation: Operation<Information>):Input {
    super.map(operation);
    return this;
  }

  public invertValues(maximum:number):Input {
    return this.map( info => info.invertValues(maximum) );
  }
}
