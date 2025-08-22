const input = document.getElementById("password");
const eyeButton = document.getElementById("passwordHide");

// Toggle password visibilirt when eye icon is clicked.
eyeButton.addEventListener("click", () => {
    if (input.type == "text") {
        input.type = "password";
        eyeButton.classList.remove("fa-eye-slash");
        eyeButton.classList.add("fa-eye");
    } 
    else {
        input.type = "text";
        eyeButton.classList.remove("fa-eye");
        eyeButton.classList.add("fa-eye-slash");
    }
})

