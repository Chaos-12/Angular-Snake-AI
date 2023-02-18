import { Directions, InfoNeuron, InfoTypes, Neuron, NeuronType } from "src/main/data";

export class Brain {
  public bias:Neuron = new Neuron(0);
  public inputs:Array<InfoNeuron> = [];
  public hidden:Array<Neuron> = [];
  public outputs:Array<InfoNeuron> = [];
}
