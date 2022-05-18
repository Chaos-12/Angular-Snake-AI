import { MathUtils } from "src/main/utils";
import { TestUtils } from "../testUtils";


describe(TestUtils.title('MathUtils'), function(){

  let wrongIntervals = [{minimum:10, maximum:0}, {minimum:-3, maximum:-10}, {minimum:8, maximum:-7}];
  let goodIntervals = [{value:0.3, minimum:0, maximum:1}, {value:-7, minimum:-2, maximum:3}, {value:30, minimum:12, maximum:24}];
  let pointIntervals = [{value:0, minimum:1, maximum:1}, {value:8, minimum:9, maximum:9}];

  describe('Function checkInterval', function(){

    describe('Error on wrong interval', function(){
      wrongIntervals.forEach( interval => {
        it(`interval [${interval.minimum}, ${interval.maximum}]`, function(){
          expect(()=>MathUtils.checkInterval(interval.minimum, interval.maximum)).toThrowError();
        })
      })
    })

    describe('Not error on right interval', function(){
      goodIntervals.forEach( interval => {
        it(`interval [${interval.minimum}, ${interval.maximum}]`, function(){
          expect(()=>MathUtils.checkInterval(interval.minimum, interval.maximum)).not.toThrowError();
        })
      })
    })

    describe('Not error on point interval', function(){
      pointIntervals.forEach( interval => {
        it(`interval [${interval.minimum}, ${interval.maximum}]`, function(){
          expect(()=>MathUtils.checkInterval(interval.minimum, interval.maximum)).not.toThrowError();
        })
      })
    })
  })

  describe('Function clamp', function(){
    describe('Error on wrong interval', function(){
      wrongIntervals.forEach( interval => {
        it(`interval [${interval.minimum}, ${interval.maximum}]`, function(){
          expect(()=>MathUtils.clamp(0, interval.minimum, interval.maximum)).toThrowError();
        })
      })
    })

    describe('Value collapsed in point interval', function(){
      pointIntervals.forEach( interval => {
        it(`interval [${interval.minimum}, ${interval.maximum}]`, function(){
          let clampedValue = MathUtils.clamp(interval.value, interval.minimum, interval.maximum);
          expect(clampedValue).toBe(interval.maximum);
          expect(clampedValue).toBe(interval.minimum);
        })
      })
    })

    describe('Value is in the interval', function(){
      goodIntervals.forEach( interval => {
        it(`value ${interval.value}, interval [${interval.minimum}, ${interval.maximum}]`, function(){
          let clampedValue = MathUtils.clamp(interval.value, interval.minimum, interval.maximum);
          expect(clampedValue).toBeLessThanOrEqual(interval.maximum);
          expect(clampedValue).toBeGreaterThanOrEqual(interval.minimum);
        })
      })
    })
  })

  describe('Function makeUnitary', function(){
    describe('Error on wrong interval', function(){
      wrongIntervals.forEach( interval => {
        it(`interval [${interval.minimum}, ${interval.maximum}]`, function(){
          expect(()=>MathUtils.makeUnitary(0, interval.minimum, interval.maximum)).toThrowError();
        })
      })
    })

    describe('Error on point interval', function(){
      pointIntervals.forEach( interval => {
        it(`interval [${interval.minimum}, ${interval.maximum}]`, function(){
          expect(()=>MathUtils.makeUnitary(interval.value, interval.minimum, interval.maximum)).toThrowError();
        })
      })
    })

    describe('Value is in the interval [0,1]', function(){
      goodIntervals.forEach( interval => {
        it(`value ${interval.value}, interval [${interval.minimum}, ${interval.maximum}]`, function(){
          let clampedValue = MathUtils.makeUnitary(interval.value, interval.minimum, interval.maximum);
          expect(clampedValue).toBeLessThanOrEqual(1);
          expect(clampedValue).toBeGreaterThanOrEqual(0);
        })
      })
    })
  })

})
