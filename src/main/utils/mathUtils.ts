
export class MathUtils {

  public static checkInterval(minimum:number, maximum:number):void{
    if(minimum > maximum){
      throw new Error(`minimum value ${minimum} > maximum value ${maximum}`);
    }
  }

  public static clamp(value:number, minimum:number, maximum:number):number{
    MathUtils.checkInterval(minimum, maximum);
    return Math.max(minimum, Math.min(value, maximum));
  }

  public static makeUnitary(value:number, minimum:number, maximum:number):number{
    if(minimum === maximum){
      throw new Error(`minimum value ${minimum} and maximum value ${maximum} must be different`);
    }
    return (MathUtils.clamp(value, minimum, maximum) - minimum)/(maximum - minimum);
  }

  public static invertUnitary(value:number):number{
    if(value < 0 || value > 1){
      throw new Error(`Value ${value} must be in interval [0,1]`);
    }
    return 1-value;
  }
}
