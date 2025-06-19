import { vi, expect, it, describe } from "vitest";
import {
  getPriceInCurrency,
  getShippingInfo,
  renderPage,
} from "../src/mocking";
import { getExchangeRate } from "../src/libs/currency";
import { getShippingQuote } from "../src/libs/shipping";
import { trackPageView } from "../src/libs/analytics";

vi.mock("../src/libs/currency");
vi.mock("../src/libs/shipping");
vi.mock("../src/libs/analytics");

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

describe("getPriceCurrency", () => {
  it("should return price in target currency", () => {
    vi.mocked(getExchangeRate).mockReturnValue(1.5);

    const price = getPriceInCurrency(10, "AUD");
    expect(price).toBe(15);
  });
});

describe("getShippingInfo", () => {
  it("should return shipping unavailable if quote cannot be fetched", () => {
    vi.mocked(getShippingQuote).mockReturnValue(null);

    const result = getShippingInfo("Rome");
    expect(result).toMatch(/unavailable/i);
  });

  it("should return shipping code and days if shippindQuote is fetched", () => {
    vi.mocked(getShippingQuote).mockReturnValue({
      cost: 100,
      estimatedDays: 2,
    });

    const shippingCost = getShippingInfo("Rome");
    expect(shippingCost).toMatch(/shipping cost: \$100 \(2 days\)/i);
  });
});

describe("renderPage", () => {
  it("should return correct content", async () => {
    const result = await renderPage();

    expect(result).toMatch(/content/i);
  });

  it("should call analytics", async () => {
    await renderPage();

    expect(trackPageView).toHaveBeenCalledWith("/home");
  });
});
