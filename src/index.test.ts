import { validateMedibankProviderNumber, validateProviderNumber } from ".";

test("returns true for a valid provider number", () => {
  expect(validateProviderNumber("2429581T")).toBeTruthy();
});

test("returns false for an invalid provider number (more than 8 characters)", () => {
  expect(validateProviderNumber("02429581T")).toBeFalsy();
});

test("returns false for an invalid provider number (incorrect check digit)", () => {
  expect(validateProviderNumber("2429582T")).toBeFalsy();
});

test("returns false for an invalid provider number (invalid leading stem character)", () => {
  expect(validateProviderNumber("A200853K")).toBeFalsy();
});

test("returns false for an invalid provider number (no check digit)", () => {
  expect(validateProviderNumber("2429582")).toBeFalsy();
});

test("returns false for an invalid provider number (5 digit provider-stem)", () => {
  expect(validateProviderNumber("429581T")).toBeFalsy();
});

test.each(["A200853K", "A204983L", "a204983l"])(
  "returns true for a valid Medibank provider number (%s)",
  (providerNumber) => {
    expect(validateMedibankProviderNumber(providerNumber)).toBeTruthy();
  }
);

test.each([
  ["incorrect check digit", "A204983B"],
  ["missing profession prefix", "204983L"],
  ["invalid profession prefix", "!204983L"],
  ["more than one profession prefix", "AA204983L"],
  ["invalid length", "A2429581T"],
])(
  "returns false for an invalid Medibank provider number (%s)",
  (_, providerNumber) => {
    expect(validateMedibankProviderNumber(providerNumber)).toBeFalsy();
  }
);
