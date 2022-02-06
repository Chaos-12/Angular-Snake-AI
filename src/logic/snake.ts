
export class Snake {

  public name : string = '';
  public head : number = 0;
  public body : number[] = [0];
  public alive : boolean = true;

  constructor(){
    this.reset(3);
  }

  public reset(lenght:number){
    this.body = [...Array(lenght+1).keys()];
    this.deleteLastPosition();
    this.head = lenght;
    this.alive = true;
  }

  public moveTo(position:number){
    this.body.push(position);
    this.head = position;
  }

  public deleteLastPosition(){
    this.body.shift();
  }

}