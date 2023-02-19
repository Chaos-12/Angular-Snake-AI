import { InfoNeuron, InputNeuron, Neuron } from "src/main/data";

export class Brain {
  public bias:Neuron = new Neuron(0);
  public inputs:Array<InputNeuron> = [];
  public hidden:Array<Neuron> = [];
  public outputs:Array<InfoNeuron> = [];
}
