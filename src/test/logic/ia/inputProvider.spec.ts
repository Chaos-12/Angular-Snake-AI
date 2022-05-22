import { Board, Directions, InputProvider, Snake } from "src/main/logic";
import { TestUtils } from "src/test/testUtils";

describe(TestUtils.title('InputProvider'), function(){

  it('Right number of food inputs', function(){
    let testBoard = new Board(new Snake());
    let inputProvider = new InputProvider();
    let inputs = inputProvider.getInputFrom(testBoard);
    expect(inputs.food.length).toBe(Directions.length);
  })

  it('Right number of body inputs', function(){
    let testBoard = new Board(new Snake());
    let inputProvider = new InputProvider();
    let inputs = inputProvider.getInputFrom(testBoard);
    expect(inputs.body.length).toBe(Directions.length);
  })

  it('Right number of wall inputs', function(){
    let testBoard = new Board(new Snake());
    let inputProvider = new InputProvider();
    let inputs = inputProvider.getInputFrom(testBoard);
    expect(inputs.wall.length).toBe(Directions.length);
  })

  it('Right number of rock inputs', function(){
    let testBoard = new Board(new Snake());
    let inputProvider = new InputProvider();
    let inputs = inputProvider.getInputFrom(testBoard);
    expect(inputs.rock.length).toBe(Directions.length);
  })

  it('Food inputs in [0,1]', function(){
    let testBoard = new Board(new Snake());
    let inputProvider = new InputProvider();
    let inputs = inputProvider.getInputFrom(testBoard);
    inputs.food.forEach( value => {
      expect(value).toBeGreaterThanOrEqual(0);
      expect(value).toBeLessThanOrEqual(1);
    })
  })

  it('Body inputs in [0,1]', function(){
    let testBoard = new Board(new Snake());
    let inputProvider = new InputProvider();
    let inputs = inputProvider.getInputFrom(testBoard);
    inputs.body.forEach( value => {
      expect(value).toBeGreaterThanOrEqual(0);
      expect(value).toBeLessThanOrEqual(1);
    })
  })

  it('Wall inputs in [0,1]', function(){
    let testBoard = new Board(new Snake());
    let inputProvider = new InputProvider();
    let inputs = inputProvider.getInputFrom(testBoard);
    inputs.wall.forEach( value => {
      expect(value).toBeGreaterThanOrEqual(0);
      expect(value).toBeLessThanOrEqual(1);
    })
  })

  it('Rock inputs in [0,1]', function(){
    let testBoard = new Board(new Snake());
    let inputProvider = new InputProvider();
    testBoard.rocks.add(testBoard.snake.head.forward(testBoard.snake.direction));
    let inputs = inputProvider.getInputFrom(testBoard);
    inputs.rock.forEach( value => {
      expect(value).toBeGreaterThanOrEqual(0);
      expect(value).toBeLessThanOrEqual(1);
    })
  })

  describe('Food in (at most) two directions', function(){
    for(let i=0; i<10; i++){
      it(`try number ${i}/10`, function(){
        let testBoard = new Board(new Snake());
        let inputProvider = new InputProvider();
        let foodInputs = inputProvider.getInputFrom(testBoard).food;
        let counter = 0;
        for(let foodInput of foodInputs){
          if(foodInput>0){
            counter ++;
          }
        }
        expect(counter).toBeLessThanOrEqual(2);
      })
    }
  })
})
