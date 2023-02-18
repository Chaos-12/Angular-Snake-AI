export class InputOld {

  constructor(
      private readonly foodInput:Array<number>,
      private readonly bodyInput:Array<number>,
      private readonly rockInput:Array<number>,
      private readonly wallInput:Array<number>){ }

  get food():Array<number>{
    return this.foodInput;
  }

  get body():Array<number>{
    return this.bodyInput;
  }

  get rock():Array<number>{
    return this.rockInput;
  }

  get wall():Array<number>{
    return this.wallInput;
  }
}
