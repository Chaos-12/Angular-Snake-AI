import { Link } from "src/main/data";

export class Neuron {
  public depth: number = 0;
  public index: number = 0;
  public value: number = 1;
  public links: Array<Link> = [];

  constructor(
    public readonly id:number){ }
}
