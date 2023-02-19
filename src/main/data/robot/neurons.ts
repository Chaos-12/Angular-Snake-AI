import { Direction, InputType, Link } from "src/main/data";

export class Neuron {
  public depth: number = 0;
  public index: number = 0;
  public value: number = 1;
  public links: Array<Link> = [];
  constructor(
    public readonly id:number){ }
}

export class InfoNeuron extends Neuron {
  constructor(id: number, public readonly direction: Direction){
      super(id);
  }
}

export class InputNeuron extends InfoNeuron {
  constructor(id: number, direction: Direction, public readonly inputType: InputType){
      super(id, direction);
  }
}
