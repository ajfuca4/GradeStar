const input = document.getElementById("password");
const passErrText = document.getElementById('password-err');
const eyeButton = document.getElementById("passwordHide");
const passwordReqs = document.getElementsByClassName("req-box");
const lengthReq = document.getElementsByClassName("length-req");
const lowerReq = document.getElementsByClassName("lower-req");
const upperReq = document.getElementsByClassName("upper-req");
const numSpecReq = document.getElementsByClassName("num-spec-req");

// When the password box is clicked, make password requirements visable
input.addEventListener("click", () => {
    for (let element of passwordReqs) {
        if (!(element.classList.contains("satisfied") && element.classList.contains("shrink"))) {
            element.classList.remove("shrink");
        }
    }
})


input.addEventListener("input", () => {
    setTimeout(() => {

        // Length Requirement
        if ((input.value.length >= 6) && (input.value.length <= 30)) {
            document.getElementById("length-req-box").classList.remove("err-text"); 
            document.getElementById("length-req-box").classList.add("satisfied"); 
            document.getElementById("length-req-box").classList.add("shrink"); 
            document.getElementById("length-req-box").classList.remove("fa-circle-xmark");
            document.getElementById("length-req-box").classList.add("fa-circle-check");
            /*
            for (let element of lengthReq) {
                if (element.classList.contains("err-text")) {
                    element.classList.remove("err-text");
                    //element.classList.add("satisfied");
                    document.getElementById("length-req-box").classList.add("shrink", "satisfied");                         
                }
                if (element.classList.contains('fa-circle-xmark')) {
                    element.classList.remove("fa-circle-xmark");
                    element.classList.add("fa-circle-check");
                }
            }
                */
        }
        else 
        {
            document.getElementById("length-req-box").classList.remove("shrink");
            document.getElementById("length-req-box").classList.remove("fa-circle-check");
            document.getElementById("length-req-box").classList.add("fa-circle-xmark");
            document.getElementById("length-req-box").classList.add("err-text"); 
            document.getElementById("length-req-box").classList.remove("satisfied"); 
            /*for (let element of lengthReq) {
                if (element.classList.contains("satisfied")) {
                    element.classList.remove("satisfied");
                    element.classList.add("err-text");
                    
                }
                if (element.classList.contains('fa-circle-check')) {
                    element.classList.remove("fa-circle-check");
                    element.classList.add("fa-circle-xmark");
                }
            }*/
        }

        // Lowercase Requirement
        if (/[a-z]/.test(input.value)) {
            document.getElementById("lower-req-box").classList.remove("err-text"); 
            document.getElementById("lower-req-box").classList.add("satisfied"); 
            document.getElementById("lower-req-box").classList.add("shrink"); 
            document.getElementById("lower-req-box").classList.remove("fa-circle-xmark");
            document.getElementById("lower-req-box").classList.add("fa-circle-check");
            /*for (let element of lowerReq) {
                if (element.classList.contains("err-text")) {
                    element.classList.remove("err-text");
                    element.classList.add("satisfied");
                    document.getElementById("lower-req-box").classList.add("shrink");                         
                }
                if (element.classList.contains('fa-circle-xmark')) {
                    element.classList.remove("fa-circle-xmark");
                    element.classList.add("fa-circle-check");
                }
            }*/
        }
        else 
        {
            document.getElementById("lower-req-box").classList.remove("shrink");
            document.getElementById("lower-req-box").classList.remove("fa-circle-check");
            document.getElementById("lower-req-box").classList.add("fa-circle-xmark");
            document.getElementById("lower-req-box").classList.add("err-text"); 
            document.getElementById("lower-req-box").classList.remove("satisfied"); 
            /*for (let element of lowerReq) {
                if (element.classList.contains("satisfied")) {
                    element.classList.remove("satisfied");
                    element.classList.add("err-text");
                    
                }
                if (element.classList.contains('fa-circle-check')) {
                    element.classList.remove("fa-circle-check");
                    element.classList.add("fa-circle-xmark");
                }
            }*/
        }
        
        // Uppercase Requirement
        if (/[A-Z]/.test(input.value)) {
            document.getElementById("upper-req-box").classList.remove("err-text"); 
            document.getElementById("upper-req-box").classList.add("satisfied"); 
            document.getElementById("upper-req-box").classList.add("shrink"); 
            document.getElementById("upper-req-box").classList.remove("fa-circle-xmark");
            document.getElementById("upper-req-box").classList.add("fa-circle-check");
            /*for (let element of upperReq) {
                if (element.classList.contains("err-text")) {
                    element.classList.remove("err-text");
                    element.classList.add("satisfied");
                    document.getElementById("upper-req-box").classList.add("shrink");
                }
                if (element.classList.contains('fa-circle-xmark')) {
                    element.classList.remove("fa-circle-xmark");
                    element.classList.add("fa-circle-check");
                }
            }*/
        }
        else 
        {
            document.getElementById("upper-req-box").classList.add("err-text"); 
            document.getElementById("upper-req-box").classList.remove("satisfied"); 
            document.getElementById("upper-req-box").classList.remove("shrink"); 
            document.getElementById("upper-req-box").classList.add("fa-circle-xmark");
            document.getElementById("upper-req-box").classList.remove("fa-circle-check");
            /*document.getElementById("upper-req-box").classList.remove("shrink");
            for (let element of upperReq) {
                if (element.classList.contains("satisfied")) {
                    element.classList.remove("satisfied");
                    element.classList.add("err-text");
                    
                }
                if (element.classList.contains('fa-circle-check')) {
                    element.classList.remove("fa-circle-check");
                    element.classList.add("fa-circle-xmark");
                }
            }*/
        }

        // Number & Special Character Requirement
        if (/[0-9/[!\"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]/.test(input.value)) {
            document.getElementById("num-spec-req-box").classList.remove("err-text"); 
            document.getElementById("num-spec-req-box").classList.add("satisfied"); 
            document.getElementById("num-spec-req-box").classList.add("shrink"); 
            document.getElementById("num-spec-req-box").classList.remove("fa-circle-xmark");
            document.getElementById("num-spec-req-box").classList.add("fa-circle-check");
            /*for (let element of numSpecReq) {
                if (element.classList.contains("err-text")) {
                    element.classList.remove("err-text");
                    element.classList.add("satisfied");
                    document.getElementById("num-spec-req-box").classList.add("shrink");       
                }
                if (element.classList.contains('fa-circle-xmark')) {
                    element.classList.remove("fa-circle-xmark");
                    element.classList.add("fa-circle-check");
                }
            }*/
            
        }
        else 
        {
            document.getElementById("num-spec-req-box").classList.add("err-text"); 
            document.getElementById("num-spec-req-box").classList.remove("satisfied"); 
            document.getElementById("num-spec-req-box").classList.remove("shrink"); 
            document.getElementById("num-spec-req-box").classList.add("fa-circle-xmark");
            document.getElementById("num-spec-req-box").classList.remove("fa-circle-check");
            /*document.getElementById("num-spec-req-box").classList.remove("shrink");
            for (let element of numSpecReq) {
                if (element.classList.contains("satisfied")) {
                    element.classList.remove("satisfied");
                    element.classList.add("err-text");
                    
                }
                if (element.classList.contains('fa-circle-check')) {
                    element.classList.remove("fa-circle-check");
                    element.classList.add("fa-circle-xmark");
                }
            }*/
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

input.addEventListener("keydown", () => {
    passErrText.innerHTML = null;
    removeInErrs(input);
})

function removeInErrs(elem) {
    elem.classList.remove("inputErr");
}