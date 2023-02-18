import { Brain, Neuron } from "src/main/data";

export class NeuronMap extends Map<number,Neuron> {

  constructor(brain:Brain){
    super();

    this.add(brain.bias);
    brain.inputs.forEach(this.add);
    brain.hidden.forEach(this.add);
    brain.outputs.forEach(this.add);
  }

  public add(neuron:Neuron):void{
    this.set(neuron.id, neuron);
  }
}
