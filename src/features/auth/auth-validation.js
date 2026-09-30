function isValidEmail(email) {
  return /\S+@\S+\.\S+/.test(email);
}

function passwordLengthReq(password) {
  return (password.length >= 6) && (password.length <= 30);
}

function passwordUpperReq(password) {
  return /[A-Z]/.test(password);
}

function passwordLowerReq(password) {
  return /[a-z]/.test(password);
}

function passwordSpecialReq(password) {
  return /[0-9/[!\"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]/.test(password);
}

function isPasswordValid(password) {
  return passwordLengthReq(password) && passwordUpperReq(password) && passwordLowerReq(password) && passwordSpecialReq(password);
}

function passwordRequirementFlags(password) {
  return {
    validLength: passwordLengthReq(password),
    containsUpper: passwordUpperReq(password),
    containsLower: passwordLowerReq(password),
    containsNumSpec: passwordSpecialReq(password)
  };
}

module.exports = {
  isValidEmail,
  passwordLengthReq,
  passwordUpperReq,
  passwordLowerReq,
  passwordSpecialReq,
  isPasswordValid,
  passwordRequirementFlags
};
