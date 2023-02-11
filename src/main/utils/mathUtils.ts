export class MathUtils {

  public static invertValue(value:number, maximum:number):number{
    return value > 0 ? 1-(value/maximum) : 0;
  }
}
