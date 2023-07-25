import { Brain, Robot } from "src/main/data";

export class Species {
  public model:Brain;
  public population:Array<Robot> = [];

  constructor(representative:Robot){
    this.model = representative.brain;
    this.population.push(representative);
  }
}
