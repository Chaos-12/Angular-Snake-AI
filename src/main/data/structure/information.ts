import { Direction, Directions } from "src/main/data";
import { AutoList } from "./autoList";

export class Information extends AutoList<number> {

  constructor(){
    super(0, Directions);
  }

}
