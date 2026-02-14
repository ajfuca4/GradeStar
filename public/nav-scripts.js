// Get the navigation buttons
const navButtons = document.querySelectorAll(".selectable-btn");

// Add event listeners to the navigation buttons to add the selected style
navButtons.forEach(button => {
    button.addEventListener("click", () => {
            navButtons.forEach(btn => btn.classList.remove("selected"));
            button.classList.add("selected");
    });
});