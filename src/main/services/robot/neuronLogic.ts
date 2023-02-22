import { Injectable } from "@angular/core";
import { Link, Neuron } from "src/main/data";

@Injectable()
export class NeuronLogic {

  public addLinkTo(neuron:Neuron, link:Link):void{
    neuron.links.push(link);
  }

  public addValueTo(neuron:Neuron, value:number):void{
    neuron.value += value;
  }

  public propagateValueFrom(neuron:Neuron):void{
    for (let link of neuron.links){
      if (link.enabled){
        this.addValueTo(link.final, link.start.value * link.weight);
      }
    }
  }

  public assignDeepnessTo(neuron:Neuron, depth:number):void{
    if (0 === depth || neuron.depth < depth){
      neuron.depth = depth;
      for (let link of neuron.links) {
        this.assignDeepnessTo(link.final, depth+1);
      }
    }
  }

  public setValue(neuron:Neuron, value:number):void {
    neuron.value = value;
  }

  public setIndex(neuron:Neuron, index:number):void {
    neuron.index = index;
  }
}
