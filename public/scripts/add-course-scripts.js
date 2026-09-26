function validateTextInput() {
    const textInputs = document.querySelectorAll("input[type='text']");
    for (const input of textInputs) {
        if (input.value.length < 1 || input.value.length > 100) {
            input.classList.add("inputErr");
        }
    }
}

function proceedAddCourse() {
    const popup = document.getElementById('popup-contents');
    popup.querySelectorAll('.inputErr').forEach((input) => input.classList.remove('inputErr'));
    validateTextInput();
    requireDateInput();
    validateDateInput();
    if (popup.querySelector('.inputErr')) {
        return;
    }
    openPopUp('add-course-step-2-tmpl');
}

function addDeliverableInput(containerId) {
    const container = document.getElementById(containerId);
    const input = container.querySelector('.deliverable-entry-input');
    const list = container.querySelector('.deliverable-chip-list');
    const value = input.value.trim();
    if (!value) {
        input.classList.add('inputErr');
        return;
    }
    const chip = document.createElement('span');
    chip.className = 'deliverable-chip';
    chip.textContent = value;
    list.appendChild(chip);
    input.value = '';
    input.classList.remove('inputErr');
}
