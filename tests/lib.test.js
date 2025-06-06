const lib = require("../lib");

describe("absolute", () => {
  it("should return a pos number if input is positive", () => {
    const result = lib.absolute(1);
    expect(result).toBe(1);
  });

  it("should return a pos number if input is negative", () => {
    const result = lib.absolute(-1);
    expect(result).toBe(1);
  });

  it("should return a 0 if input is 0", () => {
    const result = lib.absolute(0);
    expect(result).toBe(0);
  });
});

describe("greet", () => {
  it("should return the greeting messsage", () => {
    const result = lib.greet("Mosh");
    expect(result).toMatch(/Mosh/);
  });
});

describe("getCurrencies", () => {
  it("should return supported currencies", () => {
    const result = lib.getCurrencies();
    expect(result).toEqual(expect.arrayContaining(["EUR", "USD", "AUD"]));
  });
});

describe("getProduct", () => {
  it("should return the product with given id", () => {
    const result = lib.getProduct(1);
    // 3 ways
    expect(result).toEqual({ id: 1, price: 10 }); // too specific
    expect(result).toMatchObject({ id: 1, price: 10 }); //check those we are only interested in
    expect(result).toHaveProperty({ "id": 1 }); // check for existince of one specific property
  });
});
