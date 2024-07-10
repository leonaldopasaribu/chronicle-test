import { ArrayOfNumbersUtil } from './array-of-numbers.util';

describe('getArrayOfNumbers', () => {
  let func: (props: number) => number[];

  beforeEach(() => {
    func = ArrayOfNumbersUtil.getArrayOfNumbers;
  });

  it('should create func', () => {
    expect(func).toBeTruthy();
  });

  it('should return array of 0,1,2,3,4,5 when getArrayOfNumbers method with argument 5', () => {
    const stubProps = 5;
    const expectedResult = [0, 1, 2, 3, 4];

    const result = func(stubProps);

    expect(result).toEqual(expectedResult);
  });
});
