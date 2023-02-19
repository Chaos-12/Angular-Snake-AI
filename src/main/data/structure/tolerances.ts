import { InputTypes } from "src/main/data";
import { AutoList } from "./autoList";

export class Tolerances extends AutoList<number> {
  constructor(){
    super(0, InputTypes)
  }
}
