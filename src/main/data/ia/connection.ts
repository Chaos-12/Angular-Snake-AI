import { Cell } from "src/main/data";

export class Connection {

  constructor(public readonly start:Cell, public readonly final:Cell, public weight:number, public enabled:boolean = true) { }

  public propagateWeight():void{
    if (this.enabled){
      this.final.addWeight(this.weight * this.start.weight);
    }
  }

  public propagateDeepness():void{
    this.final.assignLayer(this.start.layer+1);
  }
}
