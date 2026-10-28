const templateInitializers = {
    'add-course-tmpl': initAddCoursePopup,
    'edit-course-tmpl': initEditCoursePopup
};

function initAddCoursePopup() {
    const popupWindow = document.getElementById('popup-window');
    const codeInput = document.getElementById('course-code-input');
    const titleInput = document.getElementById('course-title-input');
    const termInput = document.getElementById('course-term-input');
    const tags = document.querySelectorAll('.term-tag-btn');
    const titleError = document.getElementById('title-error');
    const codeError = document.getElementById('code-error');
    const createCourseBtn = document.getElementById('create-course-btn');

    tags.forEach(tag => {
        tag.addEventListener('click', (event) => {
            const selectedTerm = tag.getAttribute('data-term') || termTag.textContent.trim();
            termInput.value = selectedTerm;
            syncActiveTermTags(selectedTerm);
            termInput.focus();
            return;
        });
    });

    popupWindow.addEventListener('submit', (event) => {
        event.preventDefault();
        document.getElementById('create-course-btn')?.click();
    });

    createCourseBtn.addEventListener('click', async (event) => {

        const code = codeInput?.value.trim() ?? '';
        const title = titleInput?.value.trim() ?? '';
        const term = termInput?.value.trim() ?? '';

        if (!code || code.length > 100) {
            codeInput.classList.add('input-err');
            codeError?.classList.remove('shrink');
            codeError.textContent = !code ? 'Enter a course code.' : code.length > 100 ? 'Course code must be less than 100 characters.' : '';
            return
        }

        if (!title || title.length > 100) {
            titleInput.classList.add('input-err');
            titleError?.classList.remove('shrink');
            titleError.textContent = !title ? 'Enter a course title.' : title.length > 100 ? 'Course title must be less than 100 characters.' : '';
            return
        }

        createCourseBtn.disabled = true;
        try {
            const response = await fetch('/courses', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify({ code, title, term }),
            });

            const isJson = response.headers.get('content-type')?.includes('application/json');
            const data = isJson ? await response.json() : null;

            if (response.redirected && response.url.includes('/login')) {
                window.location.href = '/login';
                return;
            }

            if (!response.ok || !data?.id) {
                if (error) error.textContent = data?.error || 'Could not create the course.';
                createCourseBtn.disabled = false;
                return;
            }
            window.location.href = `/courses/${data.id}`;
        } catch (err) {
            console.log(err);
            createCourseBtn.disabled = false;
        }
    });

    [codeInput, titleInput].forEach((input) => {
        input.addEventListener('input', (event) => {
            if (input.id === 'course-code-input') {
                codeError.classList.add('shrink')
                codeInput.classList.remove('input-err');
            }

            if (input.id === 'course-title-input') {
                titleError.classList.add('shrink');
                titleInput.classList.remove('input-err');
            }
        });
    });
}

function initEditCoursePopup() {
    const popupWindow = document.getElementById('popup-window');
    const codeInput = document.getElementById('course-code-input');
    const titleInput = document.getElementById('course-title-input');
    const termInput = document.getElementById('course-term-input');
    const tags = document.querySelectorAll('.term-tag-btn');
    const titleError = document.getElementById('title-error');
    const codeError = document.getElementById('code-error');
    const updateCourseBtn = document.getElementById('update-course-btn');
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

function syncActiveTermTags(currentValue) {
    const trimmed = (currentValue || '').trim().toLowerCase();
    const tags = document.querySelectorAll('.term-tag-btn');
    tags.forEach((tag) => {
        const val = (tag.getAttribute('data-term') || tag.textContent).trim().toLowerCase();
        tag.classList.toggle('active', Boolean(trimmed) && val === trimmed);
    });
}

function lessThanOneHundredChars(str) {
    if (str.length > 100) {
        return false;
    }
    return true;
}

export function openPopUp(templateId) {
    const popup = document.getElementById('overlay');
    const popupContent = document.getElementById('popup-contents');
    const tpl = document.getElementById(templateId);
    if (!(tpl instanceof HTMLTemplateElement)) {
        console.error('openPopUp: no <template> with id', templateId);
        return;
    }

    popup.dataset.activeTemplate = templateId;

    popupContent.replaceChildren(tpl.content.cloneNode(true));
    popup.style.visibility = 'visible';
    syncActiveTermTags('');

    templateInitializers[templateId]?.(popupContent);
}

export function activePopupTemplate() {
    return document.getElementById('overlay')?.dataset.activeTemplate ?? null;
}

// TODO: THIS MAY BE SPECIFIC TO A PARTICULAR TEMPLATE
export function updateTermList(terms = []) {
    const termArray = Array.isArray(terms) ? terms : [];

    const createTagsElement = () => {
        if (termArray.length === 0) return null;
        const wrapper = document.createElement('div');
        wrapper.className = 'term-tags-wrapper';
        const list = document.createElement('div');
        list.className = 'term-tags-list';
        list.setAttribute('role', 'group');
        list.setAttribute('aria-label', 'Existing course terms');

        termArray.forEach((termItem) => {
            const btn = document.createElement('button');
            btn.type = 'button';
            btn.className = 'term-tag-btn';
            btn.setAttribute('data-term', termItem);
            btn.title = `Use ${termItem}`;
            btn.textContent = termItem;
            list.appendChild(btn);
        });

        wrapper.appendChild(list);
        return wrapper;
    };

    const tpl = document.getElementById('add-course-tmpl');
    if (tpl instanceof HTMLTemplateElement) {
        const inputGroup = tpl.content.querySelector('#course-term-input')?.closest('.input-group');
        if (inputGroup) {
            inputGroup.querySelector('.term-tags-wrapper')?.remove();
            const newTags = createTagsElement();
            if (newTags) {
                inputGroup.appendChild(newTags);
            }
        }
    }

    const activeInputGroup = document.querySelector('#popup-contents #course-term-input')?.closest('.input-group');
    if (activeInputGroup) {
        activeInputGroup.querySelector('.term-tags-wrapper')?.remove();
        const newTags = createTagsElement();
        if (newTags) {
            activeInputGroup.appendChild(newTags);
        }
        const termInput = document.getElementById('course-term-input');
        syncActiveTermTags(termInput?.value || '');
    }
}

export function closePopUp() {
    // CLEAR ALL FILLED OUT FIELDS? MAYBE? MIGHT BE BETTER FOR UX IF NOT CLEARED IDK
    const popup = document.getElementById('overlay');
    popup.dataset.activeTemplate = '';
    popup.style.visibility = 'hidden';
}

const popupForm = document.getElementById('popup-window');
if (popupForm) {
    popupForm.addEventListener('submit', (event) => {
        event.preventDefault();
        document.getElementById('create-course-btn')?.click();
    });
}

document.addEventListener('input', (event) => {
    if (event.target.id === 'course-term-input') {
        syncActiveTermTags(event.target.value);
        return;
    }

    if (event.target.id !== 'course-code-input' && event.target.id !== 'course-title-input') {
        return;
    }

    event.target.classList.remove('inputErr');
    const error = document.getElementById('create-course-error');
    if (error) error.textContent = '';
});