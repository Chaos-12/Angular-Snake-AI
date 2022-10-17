import { SnakeDeath } from "src/main/enum";
import { Board, Snake } from "src/main/logic"
import { TestUtils } from "src/test/testUtils";

describe(TestUtils.title('Board'), function(){

  it('Starts with 0 rocks', function(){
    let testBoard = new Board(new Snake());
    expect(testBoard.rocks.length).toBe(0);
  })

  it('Rocks kill snakes', function(){
    let testSnake = new Snake();
    let testBoard = new Board(testSnake);
    expect(testSnake.isAlive).toBeTrue();
    let snakeNextPosition = testSnake.head.forward(testSnake.direction);
    testBoard.rocks.add(snakeNextPosition);
    testBoard.moveSnake();
    expect(testSnake.isAlive).toBeFalse();
    expect(testSnake.deathReason).toBe(SnakeDeath.rock);
  })
})
