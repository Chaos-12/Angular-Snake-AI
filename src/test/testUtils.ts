export class TestUtils {

  public static stringify(item:Object):string {
    return JSON.stringify(item);
  }

  public static testClass(className:string, test:Function):void {
    describe('----- Testing class "' + className + '" -----', () => test());
  }

  public static parameterizedTest<Param extends Object>(testName:string, paramList:Array<Param>, test:(param:Param)=>void):void {
    describe(testName, function(){
      paramList.forEach((param:Param) => TestUtils.individualTest(TestUtils.stringify(param), () => test(param)));
    })
  }

  public static individualTest(testName:string, test:Function):void {
    it(testName, () => test());
  }

}
