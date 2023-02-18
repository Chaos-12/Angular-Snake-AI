import { Neuron } from "src/main/data";

export class Link {

  constructor(
    public readonly start:Neuron,
    public readonly final:Neuron,
    public weight:number,
    public enabled:boolean = true){ }

}
