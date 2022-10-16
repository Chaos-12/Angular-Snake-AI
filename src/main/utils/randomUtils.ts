export class RandomUtils{

  public static getRandom(maximum:number = 1, minimum:number = 0):number{
    return minimum + Math.random()*(maximum-minimum);
  }

  public static getRandomFrom<Type>(list:Array<Type>):Type{
    let randomIndex = Math.floor(RandomUtils.getRandom(list.length));
    return list[randomIndex];
  }

  public static checkLowerThan(value:number):boolean{
    return RandomUtils.getRandom() < value;
  }
}
