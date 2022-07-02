import { InnovationUtils } from "src/main/utils";
import { TestUtils } from "src/test/testUtils";

describe(TestUtils.title('InnovationUtils'), function(){

  beforeEach(function(){
    InnovationUtils.resetInnovation();
  })

  it('Innovation starts at 0', function(){
    let startInn = InnovationUtils.getOrCreateInnovation(0,1);
    expect(startInn).toBe(0);
  })

  it('Innovation increasing at step of 1', function(){
    for(let i=0; i<10; i++){
      let innovation = InnovationUtils.getOrCreateInnovation(0,i);
      expect(innovation).toBe(i);
    }
  })

  it('Innovation number repeats for same input', function(){
    let startId = 0;
    let finalId = 1;
    let firstInnovation = InnovationUtils.getOrCreateInnovation(startId, finalId);
    let secondInnovation = InnovationUtils.getOrCreateInnovation(startId, finalId);
    expect(firstInnovation).toBe(secondInnovation);
  })
})
