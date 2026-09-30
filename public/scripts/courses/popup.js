export function openPopUp(templateId) {
    const popup = document.getElementById('overlay');
    const popupContent = document.getElementById('popup-contents');
    const tpl = document.getElementById(templateId);
    if (!(tpl instanceof HTMLTemplateElement)) {
        console.error('openPopUp: no <template> with id', templateId);
        return;
    }
    popupContent.replaceChildren(tpl.content.cloneNode(true));
    popup.style.visibility = 'visible';
}

export function closePopUp() {
    // CLEAR ALL FILLED OUT FIELDS? MAYBE? MIGHT BE BETTER FOR UX IF NOT CLEARED IDK
    const popup = document.getElementById('overlay');
    popup.style.visibility = 'hidden';
}

document.addEventListener('click', (event) => {
    const openTrigger = event.target.closest('[data-popup-open]');
    if (openTrigger) {
        openPopUp(openTrigger.getAttribute('data-popup-open'));
        return;
    }

    if (event.target.closest('[data-popup-close]')) {
        closePopUp();
    }
});

const popupForm = document.getElementById('popup-window');
if (popupForm) {
    popupForm.addEventListener('submit', (event) => {
        event.preventDefault();
        document.getElementById('create-course-btn')?.click();
    });
}

document.addEventListener('input', (event) => {
    if (event.target.id !== 'course-code-input' && event.target.id !== 'course-title-input') {
        return;
    }

    event.target.classList.remove('inputErr');
    const error = document.getElementById('create-course-error');
    if (error) error.textContent = '';
});

document.addEventListener('click', async (event) => {
    const button = event.target.closest('#create-course-btn');
    if (!button || button.disabled) return;

    const codeInput = document.getElementById('course-code-input');
    const titleInput = document.getElementById('course-title-input');
    const error = document.getElementById('create-course-error');
    const code = codeInput?.value.trim() ?? '';
    const title = titleInput?.value.trim() ?? '';

    codeInput?.classList.toggle('inputErr', !code);
    titleInput?.classList.toggle('inputErr', !title);

    if (!code || !title) {
        if (error) error.textContent = 'Enter a course code and title.';
        return;
    }

    button.disabled = true;
    try {
        const response = await fetch('/courses', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({ code, title }),
        });

        const isJson = response.headers.get('content-type')?.includes('application/json');
        const data = isJson ? await response.json() : null;

        if (response.redirected && response.url.includes('/login')) {
            window.location.href = '/login';
            return;
        }

        if (!response.ok || !data?.id) {
            if (error) error.textContent = data?.error || 'Could not create the course.';
            button.disabled = false;
            return;
        }

        window.location.href = `/courses/${data.id}`;
    } catch {
        if (error) error.textContent = 'Could not create the course.';
        button.disabled = false;
    }
});
