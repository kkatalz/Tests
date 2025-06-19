import { vi, expect, it, describe } from "vitest";
import {
  getPriceInCurrency,
  getShippingInfo,
  renderPage,
  submitOrder,
  signUp,
  login,
} from "../src/mocking";
import { getExchangeRate } from "../src/libs/currency";
import { getShippingQuote } from "../src/libs/shipping";
import { trackPageView } from "../src/libs/analytics";
import { charge } from "../src/libs/payment";
import { sendEmail } from "../src/libs/email";
import security from "../src/libs/security";

vi.mock("../src/libs/currency");
vi.mock("../src/libs/shipping");
vi.mock("../src/libs/analytics");
vi.mock("../src/libs/payment");
vi.mock("../src/libs/email", async (importOriginal) => {
  const originalModule = await importOriginal();
  return {
    ...originalModule,
    sendEmail: vi.fn(),
  };
});

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

describe("submitOrder", () => {
  const order = { totalAmount: 12 };
  const creditCard = { creditCardNumber: 1234 };
  it("should return object with success true if everything is fine", async () => {
    vi.mocked(charge).mockResolvedValue({ status: "success" });

    await submitOrder(order, creditCard);

    expect(charge).toHaveBeenCalledWith(creditCard, order.totalAmount);
  });

  it("should return success if payment is successful ", async () => {
    vi.mocked(charge).mockResolvedValue({ status: "success" });

    const result = await submitOrder(order, creditCard);

    expect(result).toEqual({ success: true });
  });

  it("should return failed if payment is successful ", async () => {
    vi.mocked(charge).mockResolvedValue({ status: "failed" });

    const result = await submitOrder(order, creditCard);

    expect(result).toEqual({ success: false, error: "payment_error" });
  });
});

describe("signUp", () => {
  const email = "name@domain.com";

  it("should return false if email is not valid", async () => {
    const result = await signUp("a");

    expect(result).toBe(false);
  });

  it("should return true if email is valid", async () => {
    const result = await signUp(email);

    expect(result).toBe(true);
  });

  it("should send welcoming email if is valid", async () => {
    await signUp(email);

    expect(sendEmail).toHaveBeenCalledOnce();
    const args = vi.mocked(sendEmail).mock.calls[0];
    expect(args[0]).toBe(email);
    expect(args[1]).toMatch(/welcome/i);
  });
});

describe("login", () => {
  it("should email the one-time login code", async () => {
    const email = "name@domain.com";
    const spy = vi.spyOn(security, "generateCode");

    await login(email);

    const securityCode = spy.mock.results[0].value.toString();
    expect(sendEmail).toHaveBeenCalledWith(email, securityCode);
  });
});
