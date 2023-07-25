import { TestBed } from "@angular/core/testing";
import { BoardLogic, PositionLogic, SnakeLogic } from "src/main/services";
import { TestUtils } from "src/test/testUtils";

TestUtils.testClass('BoardLogic', function(){

  let boardLogic:BoardLogic;
  let snakeLogic:jasmine.SpyObj<SnakeLogic>;
  let positionLogic:jasmine.SpyObj<PositionLogic>;

  beforeAll( function(){
    // Creation of the dependency spies
    const snakeLogicSpy = jasmine.createSpyObj('SnakeLogic', ['create']);
    const positionLogicSpy = jasmine.createSpyObj('PositionLogic', ['create']);

    // Provide both the service-to-test and its (spy) dependencies
    TestBed.configureTestingModule({
      providers: [
        BoardLogic,
        { provide: SnakeLogic, useValue: snakeLogicSpy },
        { provide: PositionLogic, useValue: positionLogicSpy }
      ]
    });
    // Inject both the service-to-test and its (spy) dependencies
    boardLogic = TestBed.inject(BoardLogic);
    snakeLogic = TestBed.inject(SnakeLogic) as jasmine.SpyObj<SnakeLogic>;
    positionLogic = TestBed.inject(PositionLogic) as jasmine.SpyObj<PositionLogic>;
  })

  TestUtils.test('Creation of initial board OK', function(){
    let testBoard = boardLogic.buildBoard();

    expect(testBoard.rocks.length)
      .withContext('Board has 0 rocks')
      .toBe(0);

    expect(testBoard.food.position.x)
      .withContext('Food X >= 0')
      .toBeGreaterThanOrEqual(0);

    expect(testBoard.food.position.x)
      .withContext('Food X <= board.with')
      .toBeLessThanOrEqual(testBoard.width);

    expect(testBoard.food.position.y)
      .withContext('Food Y >= 0')
      .toBeGreaterThanOrEqual(0);

    expect(testBoard.food.position.y)
      .withContext('Food Y <= board.with')
      .toBeLessThanOrEqual(testBoard.width);
  })
})
