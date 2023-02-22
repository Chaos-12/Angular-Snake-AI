import { Directions, InputTypes, Neuron } from "src/main/data";

export class Brain {
  public bias:Neuron = new Neuron(Directions.length * InputTypes.length);
  public inputs:Array<Neuron> = [];
  public hidden:Array<Neuron> = [];
  public outputs:Array<Neuron> = [];
}
