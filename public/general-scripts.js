function removeInErrs(elem) {
    elem.classList.remove("inputErr");
}

document.addEventListener("keydown", (event) => {
    if (event.target.matches("input")) {
        removeInErrs(event.target);
    }
});

document.addEventListener("input", (event) => {
    if (event.target.matches("input[type='date']")) {
        removeInErrs(event.target);
    }
});
