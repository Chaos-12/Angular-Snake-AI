export class CountDownUtil {

  private count : number;
  public get isOver() : boolean {
    return this.count < 0;
  }

  constructor(private alarm : CallableFunction, private from : number = 10){
    this.count = from;
  }

  public reset() : void {
    this.count = this.from;
  }

  public nextStep() : void {
    this.count --;
    if(this.isOver){
      this.alarm();
    }
  }
}
