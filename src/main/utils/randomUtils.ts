export class RandomUtils {

  public static getRandomNumber(amplitude:number = 1, minimum:number = 0):number{
    return minimum + Math.random()*amplitude;
  }

  public static getRandomInt(maximum:number = 1, minimum:number = 0):number{
    return Math.floor(this.getRandomNumber(maximum-minimum, minimum))
  }

  public static getRandomFrom<Type>(list:Array<Type>):Type{
    let randomIndex = this.getRandomInt(list.length);
    return list[randomIndex];
  }

  public static checkLowerThan(value:number):boolean{
    return RandomUtils.getRandomNumber() < value;
  }
}
