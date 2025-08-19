const emailErrText = document.getElementById('email-err');
const emailInput = document.getElementById('email-input');

// Remove error message once user begins typing again
emailInput.addEventListener("keydown", () => {
    emailErrText.innerHTML = null;
    removeInputErrors(emailInput);
})

// Function that removes the input error formatting
function removeInputErrors(elem) {
    if(elem && elem.classList){
        elem.classList.remove("inputErr");
    } 
    else {
        console.log('Invalid Element Passed ')
    }
}