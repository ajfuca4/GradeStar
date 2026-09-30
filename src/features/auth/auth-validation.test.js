const { describe, it } = require('node:test');
const assert = require('node:assert/strict');
const {
  isValidEmail,
  isPasswordValid,
  passwordRequirementFlags,
} = require('./auth-validation');

describe('isValidEmail', () => {
  it('accepts an address with a local part and domain', () => {
    assert.equal(isValidEmail('user@example.com'), true);
  });

  it('rejects an address without a domain', () => {
    assert.equal(isValidEmail('user@'), false);
  });

  it('rejects an empty string', () => {
    assert.equal(isValidEmail(''), false);
  });
});

describe('isPasswordValid', () => {
  it('accepts a password that meets every requirement', () => {
    assert.equal(isPasswordValid('Abcde1'), true);
  });

  it('rejects a password that is too short', () => {
    assert.equal(isPasswordValid('Ab1'), false);
  });

  it('rejects a password that is too long', () => {
    assert.equal(isPasswordValid(`${'A'.repeat(29)}b1`), false);
  });

  it('rejects a password without an uppercase letter', () => {
    assert.equal(isPasswordValid('abcde1'), false);
  });

  it('rejects a password without a lowercase letter', () => {
    assert.equal(isPasswordValid('ABCDE1'), false);
  });

  it('rejects a password without a number or special character', () => {
    assert.equal(isPasswordValid('Abcdef'), false);
  });

  it('accepts a password that uses a special character', () => {
    assert.equal(isPasswordValid('Abcdef!'), true);
  });
});

describe('passwordRequirementFlags', () => {
  it('reports each requirement independently', () => {
    assert.deepEqual(passwordRequirementFlags('Abc'), {
      validLength: false,
      containsUpper: true,
      containsLower: true,
      containsNumSpec: false,
    });
  });
});
