import { Connection } from "src/main/logic";
import { NeuronType } from "src/main/enum";

export class Neuron {

  public layer:number = 0;
  public index:number = 0;

  public weight:number = 0;

  public connections:Map<number,Connection> = new Map<number,Connection>();

  constructor(public readonly type:NeuronType, public readonly id:number){ }

  public addConnection(link:Connection):void{
    this.connections.set(link.final.id,link);
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
}
