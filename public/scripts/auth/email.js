const emailInput = document.getElementById('email-input');
const emailErrText = document.getElementById('email-err');

emailInput.addEventListener("keydown", () => {
    emailErrText.innerHTML = null;
})
