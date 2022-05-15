import { Board, InputProvider, Snake } from "src/main/logic";
import { TestUtils } from "src/test/testUtils";

describe(TestUtils.title('InputProvider'), function(){

  it('Distances to Rocks are positive', function(){
    let testBoard = new Board(new Snake());
    let inputProvider = new InputProvider();
    let distances = inputProvider.distancesToRocks(testBoard);
    distances.forEach( (value) => {
      expect(value).toBeGreaterThan(0);
    })
  })
})
