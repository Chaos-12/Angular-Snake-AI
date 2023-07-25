import { ArrayUtils } from "src/main/utils";
import { TestUtils } from "src/test/testUtils";

TestUtils.testClass('ArrayUtils', function(){

  TestUtils.testGroup('Method "order" (order by value)', function(){
    const cases = [
      {list:[8], expected:[8]},
      {list:[0,1,2,3], expected:[3,2,1,0]},
      {list:[0,2,1,3], expected:[3,2,1,0]},
      {list:[0,0,1,0], expected:[1,0,0,0]},
      {list:[-1,0,5,2], expected:[5,2,0,-1]},
      {list:[0.4, 0, 1, 1], expected:[1,1,0.4,0]}
    ]

    cases.forEach( item => {
      TestUtils.test(`[${item.list.join(', ')}] -> [${item.expected.join(', ')}]`, function(){
        let output = ArrayUtils.order(item.list, (value) => value);
        expect(output.length).withContext('Right lenght').toBe(item.expected.length);
        for(let i=0; i<output.length; i++){
          expect(output[i]).toBe(item.expected[i]);
        }
      })
    })
  })

  TestUtils.testGroup('Method "order" (order by lenght)', function(){
    const cases = [
      {list:['123'], expected:['123']},
      {list:['123','12345'], expected:['12345','123']},
      {list:['1','3','2'], expected:['1','3','2']},
      {list:['1','22','3'], expected:['22','1','3']},
      {list:['a','12'], expected:['12','a']},
      {list:['1','ab'], expected:['ab','1']},
    ]

    cases.forEach( item => {
      TestUtils.test(`['${item.list.join("', '")}'] -> ['${item.expected.join("', '")}']`, function(){
        let output = ArrayUtils.order(item.list, (value) => value.length);
        expect(output.length).withContext('Right lenght').toBe(item.expected.length);
        for(let i=0; i<output.length; i++){
          expect(output[i]).toBe(item.expected[i]);
        }
      })
    })
  })
})
