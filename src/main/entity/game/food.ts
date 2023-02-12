import { Position } from "src/main/entity";

export class Food {
  constructor(
    public readonly position:Position,
    public readonly energy:number = 100,
    public readonly score:number = 50){ }

  public isInPosition(other:Position):boolean{
    return this.position.equals(other);
  }
}
