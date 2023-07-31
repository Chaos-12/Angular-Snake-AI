import { ArrayUtils } from "src/main/utils";
import { TestUtils } from "src/test/testUtils";

TestUtils.testClass('ArrayUtils', function(){

  const orderByValueCases = [
    {list:[8], expected:[8]},
    {list:[0,1,2,3], expected:[3,2,1,0]},
    {list:[0,2,1,3], expected:[3,2,1,0]},
    {list:[0,0,1,0], expected:[1,0,0,0]},
    {list:[-1,0,5,2], expected:[5,2,0,-1]},
    {list:[0.4, 0, 1, 1], expected:[1,1,0.4,0]}
  ]
  TestUtils.parameterizedTest('Method "order" (order by value)', orderByValueCases, 
      function(param:{list:Array<number>, expected:Array<number>}){
    let output = ArrayUtils.order(param.list, (value:number) => value);
    expect(output.length).withContext('Right lenght').toBe(param.expected.length);
    for(let i=0; i<output.length; i++){
      expect(output[i]).toBe(param.expected[i]);
    }
  })

  const orderByLenghtCases = [
    {list:['123'], expected:['123']},
    {list:['123','12345'], expected:['12345','123']},
    {list:['1','3','2'], expected:['1','3','2']},
    {list:['1','22','3'], expected:['22','1','3']},
    {list:['a','12'], expected:['12','a']},
    {list:['1','ab'], expected:['ab','1']},
  ]
  TestUtils.parameterizedTest('Method "order" (order by lenght)', orderByLenghtCases, 
      function(param:{list:Array<string>, expected:Array<string>}){
    let output = ArrayUtils.order(param.list, (value:string) => value.length);
    expect(output.length).withContext('Right lenght').toBe(param.expected.length);
    for(let i=0; i<output.length; i++){
      expect(output[i]).toBe(param.expected[i]);
    }
  })

})
