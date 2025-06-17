import { describe, test, it, expect } from "vitest";
import { calculateAverage, fizzBuzz, max, factorial } from "../src/intro";

describe("max", () => {
  it("should return the first argument if it is greater", () => {
    expect(max(2, 1)).toBe(2);
  });
  it("should return the second argument if it is greater", () => {
    expect(max(1, 2)).toBe(2);
  });
  it("should return the first argument if both are equal", () => {
    expect(max(2, 2)).toBe(2);
  });
});

describe("fizzBuzz", () => {
  it("should return FizzBuzz if the number is divisible by 3 and 5", () => {
    expect(fizzBuzz(15)).toBe("FizzBuzz");
  });
  it("should return Fizz if the number is divisible by 3", () => {
    expect(fizzBuzz(3)).toBe("Fizz");
  });
  it("should return Buzz if the number is divisible 5", () => {
    expect(fizzBuzz(5)).toBe("Buzz");
  });
  it("should return the number if it is not divisible 3 or 5", () => {
    expect(fizzBuzz(11)).toBe("11");
  });
});

describe("calculateAverage", () => {
  it("should return NaN if given an empty array", () => {
    expect(calculateAverage([])).toBe(NaN);
  });

  it("should calculate the average of an array with a single element", () => {
    expect(calculateAverage([1])).toBe(1);
  });

  it("should calculate the average of an array with two elements", () => {
    expect(calculateAverage([1, 2])).toBe(1.5);
  });
  it("should calculate the average of an array with three elements", () => {
    expect(calculateAverage([1, 2, 3])).toBe(2);
  });
});

describe("factorial", () => {
  it("should return 1 if number is 0", () => {
    expect(factorial(0)).toBe(1);
  });
  it("should return 1 if number is 1", () => {
    expect(factorial(1)).toBe(1);
  });

  it("should return 6 if number is 3", () => {
    expect(factorial(3)).toBe(6);
  });

  it("should return undefined if number is negative", () => {
    expect(factorial(-1)).toBeUndefined();
  });
});
