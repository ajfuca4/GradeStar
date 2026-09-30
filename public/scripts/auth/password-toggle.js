const passwordInput = document.getElementById("password");
const eyeButton = document.getElementById("passwordHide");

if (passwordInput && eyeButton) {
    const setVisibility = (revealed) => {
        passwordInput.type = revealed ? "text" : "password";
        eyeButton.classList.toggle("fa-eye-slash", revealed);
        eyeButton.classList.toggle("fa-eye", !revealed);
        eyeButton.setAttribute("aria-label", revealed ? "Hide password" : "Show password");
    };

    eyeButton.addEventListener("click", () => {
        setVisibility(passwordInput.type === "password");
    });

    eyeButton.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            setVisibility(passwordInput.type === "password");
        }
    });
}
