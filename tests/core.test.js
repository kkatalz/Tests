import { it, describe, expect } from "vitest";
import {
  getCoupons,
  validateUserInput,
  calculateDiscount,
  isPriceInRange,
  isValidUsername,
} from "../src/core";

describe("test suite", () => {
  it("should test case", () => {
    // toMatch Usage
    // const result = "The requested file was not founded";
    // expect(result).toMatch("not found");

    //check an array (any order of the same elements)
    // const result = [1, 3, 2];
    // expect(result).toEqual(expect.arrayContaining([1, 2, 3]));

    // check object
    const result = { name: "Mosh", id: 1 };
    expect(result).toMatchObject({ name: "Mosh" });
    expect(result).toHaveProperty("name");
    expect(typeof result.name).toBe("string");
  });
});

describe("getCoupons", () => {
  it("should check that array is not empty", () => {
    expect(Array.isArray(getCoupons())).toBe(true);
    expect(getCoupons().length).toBeGreaterThan(0);
  });

  it("should return an array with valid coupon codes", () => {
    const coupons = getCoupons();
    coupons.forEach((coupon) => {
      expect(coupon).toHaveProperty("code");
      expect(typeof coupon.code).toBe("string");
      expect(coupon.code).toBeTruthy();
    });
  });

  it("should return an array with valid coupon discounts", () => {
    const coupons = getCoupons();
    coupons.forEach((coupon) => {
      expect(coupon).toHaveProperty("discount");
      expect(typeof coupon.discount).toBe("number");
      expect(coupon.discount).toBeTruthy();
      expect(coupon.discount).toBeGreaterThanOrEqual(0);
      expect(coupon.discount).toBeLessThanOrEqual(1);
    });
  });
});

describe("calculateDiscount", () => {
  it("should return discounted price if given valid code", () => {
    expect(calculateDiscount(10, "SAVE10")).toBe(9);
    expect(calculateDiscount(10, "SAVE20")).toBe(8);
  });

  it("should handle non-numeric price", () => {
    expect(calculateDiscount("10", "SAVE10")).toMatch(/invalid/i);
  });
  it("should handle negative price", () => {
    expect(calculateDiscount("-10", "SAVE10")).toMatch(/invalid/i);
  });

  it("should handle non-string discount code", () => {
    expect(calculateDiscount("10", 10)).toMatch(/invalid/i);
  });

  it("should handle invalid discount code", () => {
    expect(calculateDiscount(10, "INVALID")).toBe(10);
  });
});

describe("validateUserInput", () => {
  it('should return "validation successful" message if given valid username and age', () => {
    expect(validateUserInput("Zlata", 20)).toMatch(/success/i);
  });

  it("should handle non-string username and check if username length is greather than 3 ", () => {
    expect(validateUserInput(11, 20)).toMatch(/Invalid/i);
    expect(validateUserInput("Zl", 20)).toMatch(/Invalid/i);
    expect(validateUserInput("A".repeat(256), 20)).toMatch(/Invalid/i);
  });

  it("should check if age is number and greater than 18", () => {
    expect(validateUserInput("Zlata", 12)).toMatch(/Invalid/i);
    expect(validateUserInput("Zlata", 132)).toMatch(/Invalid/i);
    expect(validateUserInput("Zlata", "12")).toMatch(/Invalid/i);
  });

  it("should return array with errors if something was invalid", () => {
    expect(validateUserInput("Zl", 12)).toMatch(/invalid username/i);
    expect(validateUserInput("Zl", 12)).toMatch(/invalid age/i);
  });
});

describe("isPriceInRange", () => {
  it("should return false when price is out of the boundaries", () => {
    expect(isPriceInRange(-10, 0, 100)).toBe(false);
    expect(isPriceInRange(200, 0, 100)).toBe(false);
  });

  it("should return true when the price is equal to the min or max", () => {
    expect(isPriceInRange(0, 0, 100)).toBe(true);
    expect(isPriceInRange(100, 0, 100)).toBe(true);
  });

  it("should return true when the price is within the range", () => {
    expect(isPriceInRange(50, 0, 100)).toBe(true);
  });
});

describe("isValidUserName", () => {
  const minLength = 5;
  const maxLength = 15;
  it("should return false when the name length is longer than set limits", () => {
    expect(isValidUsername("a".repeat(minLength - 1))).toBe(false);
    expect(isValidUsername("a".repeat(maxLength + 1))).toBe(false);
  });

  it("should return true when the name is equal to the min or max", () => {
    expect(isValidUsername("a".repeat(minLength))).toBe(true);
    expect(isValidUsername("a".repeat(maxLength))).toBe(true);
  });

  it("should return true when the name is within the range", () => {
    expect(isValidUsername("a".repeat(10))).toBe(true);
  });

  it("should return false for invalid input types", () => {
    expect(isValidUsername(null)).toBe(false);
    expect(isValidUsername(undefined)).toBe(false);
    expect(isValidUsername(1)).toBe(false);
  });
});
