import { describe, expect, it } from "vitest";
import { validateCard } from "../payment";

const future = "12/40";

describe("validateCard", () => {
	it("accepts the standard test card", () => {
		expect(
			validateCard({ number: "4242 4242 4242 4242", expiry: future, cvc: "123" })
		).toEqual({});
	});

	it("rejects numbers that fail the Luhn check", () => {
		expect(
			validateCard({ number: "4242 4242 4242 4241", expiry: future, cvc: "123" }).number
		).toBeDefined();
	});

	it("rejects expired or malformed expiry dates", () => {
		expect(validateCard({ number: "4242424242424242", expiry: "01/20", cvc: "123" }).expiry).toBeDefined();
		expect(validateCard({ number: "4242424242424242", expiry: "1234", cvc: "123" }).expiry).toBeDefined();
	});

	it("requires a 3 or 4 digit security code", () => {
		expect(validateCard({ number: "4242424242424242", expiry: future, cvc: "12" }).cvc).toBeDefined();
		expect(validateCard({ number: "4242424242424242", expiry: future, cvc: "1234" })).toEqual({});
	});
});
