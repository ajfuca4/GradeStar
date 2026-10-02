// Get the navigation buttons within the sidebar
const navButtons = document.querySelectorAll("#nav .selectable-btn");

function updateActiveNav() {
    const pathname = window.location.pathname;
    if (/(?:^|\/)courses(?:\/|\?|#|$)/.test(pathname)) {
        navButtons.forEach(btn => {
            btn.classList.remove("selected");
            btn.removeAttribute("aria-current");
        });
        const coursesBtn = document.getElementById("courses-btn");
        if (coursesBtn) {
            coursesBtn.classList.add("selected");
            coursesBtn.setAttribute("aria-current", "page");
        }
    }
}

// Ensure active navigation button matches the current route
updateActiveNav();
window.addEventListener("popstate", updateActiveNav);

// Add event listeners to the navigation buttons to add the selected style
navButtons.forEach(button => {
    button.addEventListener("click", () => {
        navButtons.forEach(btn => {
            btn.classList.remove("selected");
            btn.removeAttribute("aria-current");
        });
        button.classList.add("selected");
        button.setAttribute("aria-current", "page");
    });
});

// Navigate back to courses dashboard if courses button is clicked from a sub-page
const coursesBtn = document.getElementById("courses-btn");
if (coursesBtn) {
    coursesBtn.addEventListener("click", () => {
        if (window.location.pathname !== "/courses") {
            window.location.href = "/courses";
        }
    });
}