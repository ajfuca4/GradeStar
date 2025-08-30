
export function lengthReq(password) {
    return (password.length >= 6) && (password.length <= 30);
}

export function upperReq(password) {
    return /[A-Z]/.test(password);
}

export function lowerReq(password) {
    return /[a-z]/.test(password);
}

export function numSpecReq(password) {
    return /[0-9/[!\"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]/.test(password);
}

export function isValidPassword(password) {
    return (lengthReq(password) &&  upperReq(password) && lowerReq(password) && numSpecReq(password))
}