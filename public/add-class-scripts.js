function validateTextInput() {
    const textInputs = document.querySelectorAll("input[type='text']");
    for (const input of textInputs) {
        if (input.value.length < 1 || input.value.length > 100) {
            input.classList.add("inputErr");
        }
    }
}

function validateDateInput() {
    const dateInputs = document.querySelectorAll("#popup-date-inputs input[type='date']");
    const startDate = dateInputs[0];
    const endDate = dateInputs[1];
    if (startDate.value && endDate.value && endDate.value <= startDate.value) {
        endDate.classList.add("inputErr");
    }
}

function requireDateInput() {
    const dateInputs = document.querySelectorAll("#popup-date-inputs input[type='date']");
    for (const input of dateInputs) {
        if (!input.value) {
            input.classList.add("inputErr");
        }
    }
}
