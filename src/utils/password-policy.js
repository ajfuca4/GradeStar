
const passwordLengthReq = function lengthReq(password) {
    return (password.length >= 6) && (password.length <= 30);
}

const passwordUpperReq = function upperReq(password) {
    return /[A-Z]/.test(password);
}

const passwordLowerReq = function lowerReq(password) {
    return /[a-z]/.test(password);
}

const passwordSpecialReq = function numSpecReq(password) {
    return /[0-9/[!\"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]/.test(password);
}

const isPasswordValid = function isValidPassword(password) {
    return (lengthReq(password) &&  upperReq(password) && lowerReq(password) && numSpecReq(password))
}

module.exports = { passwordLengthReq, passwordUpperReq, passwordLowerReq, passwordSpecialReq, isPasswordValid };