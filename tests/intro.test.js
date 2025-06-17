import { describe, test, it, expect } from "vitest";
import { fizzBuzz, max } from "../src/intro";

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
