import { Direction, InfoType, Neuron } from "src/main/data";

export class InfoNeuron extends Neuron {

  constructor(id: number,
    public readonly info: InfoType,
    public readonly direction: Direction){
      super(id);
  }

}
