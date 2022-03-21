const validateProviderNumber = require('./index');

test('returns true for a valid provider number', () => {
	expect(validateProviderNumber('2429581T')).toBeTruthy();
})

test('returns true for a valid provider number', () => {
	expect(validateProviderNumber('0446565BY')).toBeFalsy();
})

test('returns false for an invalid provider number (incorrect check digit)', () => {
	expect(validateProviderNumber('2429582T')).toBeFalsy();
})

test('returns false for an invalid provider number (no check digit)', () => {
	expect(validateProviderNumber('2429582')).toBeFalsy();
})

test('returns false for an invalid provider number (5 digit provider-stem)', () => {
	expect(validateProviderNumber('429581T')).toBeFalsy();
})
