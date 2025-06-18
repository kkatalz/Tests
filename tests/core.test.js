import { it, describe, expect } from "vitest";

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

