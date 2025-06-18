import { it, describe, expect } from "vitest";
import { getCoupons } from "../src/core";

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
