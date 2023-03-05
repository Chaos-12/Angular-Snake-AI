import { Directions } from "src/main/data";
import { Operation } from "src/main/interface";
import { AutoList } from "./autoList";

export class Information extends AutoList<number> {

  constructor(){
    super(0, Directions);
  }

  public override map(operation: Operation<number>): Information {
      super.map(operation);
      return this;
  }

  public invertValues(maximum:number):Information {
    return this.map( value => value > 0 ? 1-(value/maximum) : 0);
  }

}
