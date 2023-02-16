import { Position } from "src/main/data";

export class Food {
  constructor(
    public readonly position:Position = new Position(1,1),
    public readonly energy:number = 100,
    public readonly score:number = 50){ }

  public isIn(other:Position):boolean{
    return this.position.equals(other);
  }
}
