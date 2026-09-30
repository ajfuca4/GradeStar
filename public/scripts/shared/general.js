function removeInErrs(elem) {
    elem.classList.remove("inputErr");
}

function clearFieldError(input) {
    const group = input.closest(".form-group");
    if (!group) return;
    const err = group.querySelector(":scope > .err-text");
    if (err) err.textContent = "";
}

document.addEventListener("keydown", (event) => {
    if (event.target.matches("input")) {
        removeInErrs(event.target);
        clearFieldError(event.target);
    }
});
