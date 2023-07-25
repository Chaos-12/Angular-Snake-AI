export class TestUtils {

  public static testClass(className:string, test:Function) {
    TestUtils.testGroup('----- Testing class "'.concat(className, '" -----'), test);
  }

  public static testGroup(testName:string, test:Function) {
    describe(testName, () => test());
  }

  public static test(testName:string, test:Function) {
    it(testName, () => test());
  }
}
