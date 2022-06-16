import { Neuron } from "src/main/logic";

export class Connection {

  public enabled:boolean = true;

  get endNeuron():number{
    return this.to.id;
  }

  constructor(private readonly from:Neuron, private readonly to:Neuron, private readonly weight:number) { }

  public propagateWeight():void{
    if (this.enabled){
      this.to.addWeight(this.weight * this.from.weight);
    }
  }

  public propagateDeepness():void{
    this.to.assignLayer(this.from.layer+1);
  }

  public equals(other:any):boolean{
    if(!(other instanceof Connection)){
      return false;
    }
    if(!this.from.equals(other.from)){
      return false;
    }
    if(!this.to.equals(other.to)){
      return false;
    }
    return true;
  }

}
