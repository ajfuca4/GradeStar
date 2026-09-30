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
