const input = document.getElementById("password");
const eyeButton = document.getElementById("passwordHide");
const passwordReqs = document.getElementById("password-req");
const lengthReq = document.getElementsByClassName("length-req");
const lowerReq = document.getElementsByClassName("lower-req");
const upperReq = document.getElementsByClassName("upper-req");
const numSpecReq = document.getElementsByClassName("num-spec-req");
let shrinkTimerId = null;

// When the password box is clicked, make password requirements visable
input.addEventListener("click", () => {
    passwordReqs.classList.add("expand");
})


input.addEventListener("input", () => {
    setTimeout(() => {

        // Length Requirement
        if ((input.value.length >= 6) && (input.value.length <= 30)) {
            for (let element of lengthReq) {
                if (element.classList.contains("err-text")) {
                    element.classList.remove("err-text");
                    element.classList.add("satisfied");
                    setTimeout(() => {
                        if ((input.value.length >= 6) && (input.value.length <= 30)) {
                            element.classList.remove("unhide");
                            element.classList.add("hide");
                        }
                    }, 1000);
                         
                }
                if (element.classList.contains('fa-circle-xmark')) {
                    element.classList.remove("fa-circle-xmark");
                    element.classList.add("fa-circle-check");
                    setTimeout(() => {
                        if ((input.value.length >= 6) && (input.value.length <= 30)) {
                            element.classList.remove("unhide");
                            element.classList.add("hide");
                        }
                    }, 1000);
                }
            }
            shrinkTimerID = setTimeout(() => {
                if ((input.value.length >= 6) && (input.value.length <= 30)) {
                    document.getElementById("length-req-box").classList.add("shrink");
                }
            }, 1100);
        }
        else 
        {
            if (shrinkTimerId) clearTimeout(shrinkTimerId);
            document.getElementById("length-req-box").classList.remove("shrink");
            for (let element of lengthReq) {
                if (element.classList.contains("satisfied")) {
                    element.classList.remove("satisfied");
                    element.classList.add("err-text");
                    element.classList.remove("hide");
                    element.classList.add("unhide");
                    
                }
                if (element.classList.contains('fa-circle-check')) {
                    element.classList.remove("fa-circle-check");
                    element.classList.remove("hide");
                    element.classList.add("fa-circle-xmark");
                    element.classList.add("unhide");
                }
            }
        }

        // Lowercase Requirement
        if (/[a-z]/.test(input.value)) {
            for (let element of lowerReq) {
                if (element.classList.contains("err-text")) {
                    element.classList.remove("err-text");
                    element.classList.add("satisfied");
                    setTimeout(() => {
                        if (/[a-z]/.test(input.value)) {
                            element.classList.remove("unhide");
                            element.classList.add("hide");
                        }
                    }, 1000);
                         
                }
                if (element.classList.contains('fa-circle-xmark')) {
                    element.classList.remove("fa-circle-xmark");
                    element.classList.add("fa-circle-check");
                    setTimeout(() => {
                        if (/[a-z]/.test(input.value)) {
                            element.classList.remove("unhide");
                            element.classList.add("hide");
                        }
                    }, 1000);
                }
            }
            setTimeout(() => {
                if (/[a-z]/.test(input.value)) {
                    document.getElementById("lower-req-box").classList.add("shrink");
                }
            }, 1100);
        }
        else 
        {
            document.getElementById("lower-req-box").classList.remove("shrink");
            for (let element of lowerReq) {
                if (element.classList.contains("satisfied")) {
                    element.classList.remove("satisfied");
                    element.classList.add("err-text");
                    element.classList.remove("hide");
                    element.classList.add("unhide");
                    
                }
                if (element.classList.contains('fa-circle-check')) {
                    element.classList.remove("fa-circle-check");
                    element.classList.remove("hide");
                    element.classList.add("fa-circle-xmark");
                    element.classList.add("unhide");
                }
            }
        }
        
        // Uppercase Requirement
        if (/[A-Z]/.test(input.value)) {
            for (let element of upperReq) {
                if (element.classList.contains("err-text")) {
                    element.classList.remove("err-text");
                    element.classList.add("satisfied");
                    setTimeout(() => {
                        if (/[A-Z]/.test(input.value)) {
                            element.classList.remove("unhide");
                            element.classList.add("hide");
                        }
                    }, 1000);
                         
                }
                if (element.classList.contains('fa-circle-xmark')) {
                    element.classList.remove("fa-circle-xmark");
                    element.classList.add("fa-circle-check");
                    setTimeout(() => {
                        if (/[A-Z]/.test(input.value)) {
                            element.classList.remove("unhide");
                            element.classList.add("hide");
                        }
                    }, 1000);
                }
            }
            setTimeout(() => {
                if (/[A-Z]/.test(input.value)) {
                    document.getElementById("upper-req-box").classList.add("shrink");
                }
            }, 1100);
        }
        else 
        {
            document.getElementById("upper-req-box").classList.remove("shrink");
            for (let element of upperReq) {
                if (element.classList.contains("satisfied")) {
                    element.classList.remove("satisfied");
                    element.classList.add("err-text");
                    element.classList.remove("hide");
                    element.classList.add("unhide");
                    
                }
                if (element.classList.contains('fa-circle-check')) {
                    element.classList.remove("fa-circle-check");
                    element.classList.remove("hide");
                    element.classList.add("fa-circle-xmark");
                    element.classList.add("unhide");
                }
            }
        }

        // Number & Special Character Requirement
        if (/[/[!\"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]/.test(input.value)) {
            for (let element of numSpecReq) {
                if (element.classList.contains("err-text")) {
                    element.classList.remove("err-text");
                    element.classList.add("satisfied");
                    setTimeout(() => {
                        if (/[/[!\"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]/.test(input.value)) {
                            element.classList.remove("unhide");
                            element.classList.add("hide");
                        }
                    }, 1000);
                         
                }
                if (element.classList.contains('fa-circle-xmark')) {
                    element.classList.remove("fa-circle-xmark");
                    element.classList.add("fa-circle-check");
                    setTimeout(() => {
                        if (/[/[!\"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]/.test(input.value)) {
                            element.classList.remove("unhide");
                            element.classList.add("hide");
                        }
                    }, 1000);
                }
            }
            setTimeout(() => {
                if (/[/[!\"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]/.test(input.value)) {
                    document.getElementById("num-spec-req-box").classList.add("shrink");
                }
            }, 1100);
        }
        else 
        {
            document.getElementById("num-spec-req-box").classList.remove("shrink");
            for (let element of numSpecReq) {
                if (element.classList.contains("satisfied")) {
                    element.classList.remove("satisfied");
                    element.classList.add("err-text");
                    element.classList.remove("hide");
                    element.classList.add("unhide");
                    
                }
                if (element.classList.contains('fa-circle-check')) {
                    element.classList.remove("fa-circle-check");
                    element.classList.remove("hide");
                    element.classList.add("fa-circle-xmark");
                    element.classList.add("unhide");
                }
            }
        }

        // Number and Special Characters Requirement
        if (/[/[!\"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]/.test(input.value)) {
            for (let element of numSpecReq) {
                if (element.classList.contains("err-text")) {
                    element.classList.remove("err-text");
                    element.classList.add("satisfied");
                    
                }
                if (element.classList.contains('fa-circle-xmark')) {
                    element.classList.remove("fa-circle-xmark");
                    element.classList.add("fa-circle-check");
                }
            }
        }
        else 
        {
            for (let element of numSpecReq) {
                if (element.classList.contains("satisfied")) {
                    element.classList.remove("satisfied");
                    element.classList.add("err-text");
                }
                if (element.classList.contains('fa-circle-check')) {
                    element.classList.remove("fa-circle-check");
                    element.classList.add("fa-circle-xmark");
                }
            }
        }
    }, 1)
    
})

// Toggle password visibility when eye icon is clicked.
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