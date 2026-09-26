const User = require('../../models/user-model.js');
const bcrypt = require('bcrypt');

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

async function findUserByEmail(email) {
  return User.findOne({ email });
}

async function isPasswordCorrect(password, hashedPassword) {
  return bcrypt.compare(password, hashedPassword);
}

async function signup(email, password) {
  const user = await findUserByEmail(email);
  const emailIsValid = isValidEmail(email);
  const passwordIsValid = isPasswordValid(password);
  const requirementFlags = passwordRequirementFlags(password);

  if (user || !passwordIsValid || !emailIsValid) {
    let emailErrMsg = null;
    if (!emailIsValid) {
      emailErrMsg = "This is not a valid email.";
    } else if (user) {
      emailErrMsg = "An account already exists with this email.";
    }

    return {
      ok: false,
      emailErrMsg,
      passwordErrMsg: passwordIsValid ? null : "Password does not meet all the requirements.",
      ...requirementFlags
    };
  }

  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  const userdata = await User.insertMany({ email, password: hashedPassword });
  console.log(userdata);

  return { ok: true };
}

module.exports = {
  isValidEmail,
  passwordLengthReq,
  passwordUpperReq,
  passwordLowerReq,
  passwordSpecialReq,
  isPasswordValid,
  findUserByEmail,
  isPasswordCorrect,
  signup
};
