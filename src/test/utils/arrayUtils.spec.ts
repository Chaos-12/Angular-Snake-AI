import { ArrayUtils } from "src/main/utils";
import { TestUtils } from "src/test/testUtils";

describe(TestUtils.title('ArrayUtils'), function(){

  describe('Function orderArray', function(){

    const examples = [
      {list:[9], expected:[0]},
      {list:[0,1,2,3], expected:[3,2,1,0]},
      {list:[8,4,2,0], expected:[0,1,2,3]},
      {list:[6,2,4,0], expected:[0,2,1,3]},
      {list:[0,0,0,0], expected:[0,1,2,3]},
      {list:[-1,0,5,2], expected:[2,3,1,0]},
      {list:[0.4, 0, 1, 1], expected:[2,3,0,1]}
    ];

    examples.forEach( example => {
      it(`[${example.list.join(', ')}]`, function(){
        let output = ArrayUtils.getOrderedIndexesOf(example.list);
        for(let i=0; i<output.length; i++){
          expect(output[i]).toBe(example.expected[i]);
        }
      })
    })
  })
})
