const passwordLengthReq = function(password) {
    return (password.length >= 6) && (password.length <= 30);
}

const passwordUpperReq = function(password) {
    return /[A-Z]/.test(password);
}

const passwordLowerReq = function(password) {
    return /[a-z]/.test(password);
}

const passwordSpecialReq = function(password) {
    return /[0-9/[!\"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]/.test(password);
}

const isPasswordValid = function(password) {
    return (passwordLengthReq(password) &&  passwordUpperReq(password) && passwordLowerReq(password) && passwordSpecialReq(password))
}

module.exports = { passwordLengthReq, passwordUpperReq, passwordLowerReq, passwordSpecialReq, isPasswordValid };