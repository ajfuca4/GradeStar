import { updateTermList } from './popup.js';

const optionsBtns = document.querySelectorAll('.options-btn');
const deleteBtn = document.querySelectorAll('.dropdown-item[data-action="delete"]');
const editBtn = document.querySelectorAll('.dropdown-item[data-action="edit"]');

optionsBtns.forEach((btn) => {
    btn.addEventListener('click', (event) => {
        const target = event.target.closest('.options-wrapper');
        const optionsDropdown = target.getElementsByClassName('dropdown-container');
        console.log(optionsDropdown);
        if (optionsDropdown[0].classList.contains('visible')) {
            optionsDropdown[0].classList.remove('visible');
        } else {
            optionsDropdown[0].classList.add('visible');
        }
    });
});

deleteBtn.forEach((btn) => {
    btn.addEventListener('click', async (event) => {
        const courseCard = event.target.closest('.course-card');
        const courseId = courseCard.dataset.courseId;

        try {
            const response = await fetch(`/courses/${courseId}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                courseCard.remove();
                if (document.querySelectorAll('.course-card').length === 0) {
                    document.getElementById('empty-courses-state')?.removeAttribute('hidden');
                }
                const data = await response.json().catch(() => null);
                if (data && Array.isArray(data.terms)) {
                    updateTermList(data.terms);
                }
            }
            else {
                alert("Something went wrong deleting the course. Please try again later.");
            }

        } catch (err) {
            console.error("Network Error deleting course:", err);
        }
    });
});
