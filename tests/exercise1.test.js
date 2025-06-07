const lib = require("../exercise1");

describe("fizzBuzz", () => {
  it("should throw an exception if input is not a number", () => {
    const args = [null, undefined, "", false, {}, []];
    args.forEach((arg) => {
      expect(() => {
        lib.fizzBuzz(arg);
      }).toThrow();
    });
  });

  it("should return FizzBuzz if number is divisble by 3 and 5", () => {
    const result = lib.fizzBuzz(15);
    expect(result).toBe("FizzBuzz");
  });

  it("should return Fizz if number is divisble by 3 and not 5", () => {
    const result = lib.fizzBuzz(6);
    expect(result).toBe("Fizz");
  });

  it("should return Buzz if number is divisble by 5 and not 3", () => {
    const result = lib.fizzBuzz(10);
    expect(result).toBe("Buzz");
  });

  it("should return number if it's not divisble either by 5 or 3", () => {
    const result = lib.fizzBuzz(11);
    expect(result).toBe(11);
  });
});
