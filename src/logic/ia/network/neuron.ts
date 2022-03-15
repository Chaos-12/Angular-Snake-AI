import { Connection, NeuronType } from "src/logic";

export class Neuron {

  public layer:number = 0;
  public index:number = 0;

  public weight:number = 1;

  private connections:Map<number,Connection> = new Map<number,Connection>();

  constructor(public readonly type:NeuronType, public readonly id:number){ }

  public addConnection(link:Connection):void{
    this.connections.set(link.endNeuron,link);
  }

  public addWeight(value:number):void{
    this.weight += value;
  }

  public assignLayer(newLayer:number):void{
    if (this.type === NeuronType.input || this.layer < newLayer){
      this.layer = newLayer;
      for (let link of this.connections.values()){
        link.propagateDeepness();
      }
    }
  }

  public propagateWeight():void{
    for (let link of this.connections.values()){
      link.propagateWeight();
    }
  }

  public equals(other:any):boolean{
    if (!(other instanceof Neuron)){
      return false;
    }
    if (this.id !== other.id){
      return false;
    }
    if (this.type !== other.type){
      return false;
    }
    return true;
  }

}
