import { Neuron } from "src/main/logic";

export class Connection {

  get endNeuron():number{
    return this.to.id;
  }

  constructor(public readonly from:Neuron, public readonly to:Neuron, public weight:number, public enabled:boolean = true) { }

  public propagateWeight():void{
    if (this.enabled){
      this.to.addWeight(this.weight * this.from.weight);
    }
  }

  public propagateDeepness():void{
    this.to.assignLayer(this.from.layer+1);
  }
}
