const { User } = require('../../models');
const bcrypt = require('bcrypt');
const {
  isValidEmail,
  isPasswordValid,
  passwordRequirementFlags
} = require('./auth-validation');

async function findUserByEmail(email) {
  return User.findOne({ email });
}

async function isPasswordCorrect(password, hashedPassword) {
  return bcrypt.compare(password, hashedPassword);
}

async function login(email, password) {
  const user = await findUserByEmail(email);
  if (!user) {
    return { ok: false };
  }

  const passwordMatches = await isPasswordCorrect(password, user.password);
  if (!passwordMatches) {
    return { ok: false };
  }

  return { ok: true, user };
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
  const userdata = await User.insertMany({
    email,
    password: hashedPassword,
    startDateSeparation: false
  });
  console.log(userdata);

  return { ok: true };
}

module.exports = {
  login,
  signup
};
