function validateTextInput() {
    const textInputs = document.querySelectorAll("input[type='text']");
    for (const input of textInputs) {
        if (input.value.length < 1 || input.value.length > 100) {
            input.classList.add("inputErr");
        }
    }
}
