import { vi, expect, it, describe } from "vitest";

describe("mock test", () => {
  it("test case", () => {
    const greet = vi.fn();
    // greet.mockReturnValue("hello"); //add value
    // greet.mockResolvedValue("hello"); //add promise
    greet.mockImplementation((name) => "Hello " + name); // add logic

    // const result = greet();
    // greet().then((result) => console.log(result));
    const result = greet("Mosh");
    expect(greet).toHaveBeenCalledOnce();
  });
});

describe("return text message", () => {
  it("should return ok message", () => {
    const sendText = vi.fn();
    sendText.mockReturnValue("ok");

    const result = sendText("message");
    expect(sendText).toHaveBeenCalledWith("message");
    expect(result).toBe("ok");
  });
});

