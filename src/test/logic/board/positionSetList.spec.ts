import { Position, PositionSetList } from "src/main/logic";
import { TestUtils } from "src/test/testUtils";

describe(TestUtils.title('PositionSetList'), function(){

  let validPositions = new Array<Position>();

  beforeAll(function(){
    for(let i=0; i<12; i++){
      validPositions.push(new Position(i,i));
    }
  })

  describe('Length ok', function(){
    [1,2,5,12].forEach(number => {
      it(`length ${number}`, function(){
        let testList = new PositionSetList();
        for(let i=0; i<number; i++){
          testList.add(validPositions[i]);
        }
        expect(testList.length).toBe(number);
      })
    })
  })

  describe('Adds ok', function(){
    validPositions.forEach(position => {
      it(`Position(${position.x}, ${position.y})`, function(){
        let testList = new PositionSetList();
        expect(testList.contains(position)).toBeFalse();
        expect(testList.length).toBe(0);
        testList.add(position);
        expect(testList.contains(position)).toBeTrue();
        expect(testList.length).toBe(1);
      })
    })
  })

  describe('Removes ok', function(){
    validPositions.forEach(position => {
      it(`Position(${position.x}, ${position.y})`, function(){
        let testList = new PositionSetList();
        testList.add(position);
        expect(testList.contains(position)).toBeTrue();
        expect(testList.length).toBe(1);
        testList.removeFirst();
        expect(testList.contains(position)).toBeFalse();
        expect(testList.length).toBe(0);
      })
    })
  })

  it('FIFO', function(){
    let testList = new PositionSetList();
    testList.add(validPositions[0]);
    expect(testList.contains(validPositions[0])).toBeTrue();
    testList.add(validPositions[1]);
    expect(testList.length).toBe(2);
    testList.removeFirst();
    expect(testList.length).toBe(1);
    expect(testList.contains(validPositions[0])).toBeFalse();
  })

})
