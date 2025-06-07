const lib = require("../lib");
const db = require("../db");
const mail = require("../mail");

// Test numbers
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

// Test Strings
describe("greet", () => {
  it("should return the greeting messsage", () => {
    const result = lib.greet("Mosh");
    expect(result).toMatch(/Mosh/);
  });
});

// Test aray
describe("getCurrencies", () => {
  it("should return supported currencies", () => {
    const result = lib.getCurrencies();
    expect(result).toEqual(expect.arrayContaining(["EUR", "USD", "AUD"]));
  });
});

// Test object
describe("getProduct", () => {
  it("should return the product with given id", () => {
    const result = lib.getProduct(1);
    // 3 ways
    expect(result).toEqual({ id: 1, price: 10 }); // too specific
    expect(result).toMatchObject({ id: 1, price: 10 }); //check those we are only interested in
    expect(result).toHaveProperty("id", 1); // check for existince of one specific property
  });
});

// Test Exceptions
describe("registerUser", () => {
  it("should throw if username is falsy", () => {
    const args = [null, undefined, NaN, "", 0, false];
    args.forEach((a) => {
      expect(() => {
        lib.registerUser(a);
      }).toThrow();
    });
  });
  it("should return a user object if valid username is passed", () => {
    const result = lib.registerUser("Mosh");
    expect(result).toMatchObject({ username: "Mosh" });
    expect(result.id).toBeGreaterThan(0);
  });
});

describe("applyDiscout", () => {
  it("should apply 10% discont if customer has more than 10 points", () => {
    db.getCustomerSync = function (customerId) {
      console.log("Fake reading customer...");
      return { id: customerId, points: 20 };
    };

    const order = { customerId: 1, totalPrice: 10 };
    lib.applyDiscount(order);
    expect(order.totalPrice).toBe(9);
  });
});

describe("notifyCustomer", () => {
  it("should send an email to the customer", () => {
    db.getCustomerSync = jest.fn().mockReturnValue({ email: "a" });

    mail.send = jest.fn();

    lib.notifyCustomer({ customerId: 1 });

    expect(mail.send).toHaveBeenCalled();
    expect(mail.send.mock.calls[0][0]).toBe("a");
    expect(mail.send.mock.calls[0][1]).toMatch(/order/);
  });
});
