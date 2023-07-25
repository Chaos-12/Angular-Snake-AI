import { Snake } from "src/main/data";
import { SnakeLogic } from "src/main/services";
import { TestUtils } from "src/test/testUtils";

TestUtils.testClass('SnakeLogic', function(){

  // Service with no dependences
  let snakeLogic:SnakeLogic = new SnakeLogic();

  TestUtils.test('Creation of initial snake OK', function(){
    let testSnake = snakeLogic.buildSnake();

    expect(testSnake.isAlive)
      .withContext('Snake is alive')
      .toBeTrue();

    expect(testSnake.nFoodEaten)
      .withContext('Snake starts with 0 foods eaten')
      .toBe(0);

    expect(testSnake.nStepTaken)
      .withContext('Snake starts with 0 steps taken')
      .toBe(0);

    expect(testSnake.length)
      .withContext('Snake starts with lenght 3')
      .toBe(3);

    expect(testSnake.energy)
      .withContext('Snake starts with maximum energy')
      .toBe(Snake.maxEnergy);
  })

})
