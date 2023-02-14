import { Neuron } from "src/main/entity";

export class Connection {

  constructor(public readonly start:Neuron, public readonly final:Neuron, public weight:number, public enabled:boolean = true) { }

  public propagateWeight():void{
    if (this.enabled){
      this.final.addWeight(this.weight * this.start.weight);
    }
  }

  public propagateDeepness():void{
    this.final.assignLayer(this.start.layer+1);
  }
}
