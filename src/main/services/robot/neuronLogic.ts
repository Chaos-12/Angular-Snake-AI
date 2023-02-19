import { Injectable } from "@angular/core";
import { Input, InputNeuron, Link, Neuron } from "src/main/data";

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

  public setInfo(neuron:InputNeuron, input:Input):void {
    neuron.value = input.getInfo(neuron.inputType, neuron.direction);
  }

  public setValue(neuron:Neuron, value:number):void {
    neuron.value = value;
  }
}
