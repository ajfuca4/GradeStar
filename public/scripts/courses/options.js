import { updateTermList } from './popup.js';

document.addEventListener('click', async (event) => {
    // Toggle options dropdown
    const optionsBtn = event.target.closest('.options-btn');
    if (optionsBtn) {
        const target = optionsBtn.closest('.options-wrapper');
        const optionsDropdown = target?.querySelector('.dropdown-container');
        if (optionsDropdown) {
            document.querySelectorAll('.dropdown-container.visible').forEach((dropdown) => {
                if (dropdown !== optionsDropdown) {
                    dropdown.classList.remove('visible');
                }
            });
            optionsDropdown.classList.toggle('visible');
        }
        return;
    }

    // Delete course
    const deleteBtn = event.target.closest('.dropdown-item[data-action="delete"]');
    if (deleteBtn) {
        const courseCard = deleteBtn.closest('.course-card');
        if (!courseCard) return;
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
            } else {
                alert("Something went wrong deleting the course. Please try again later.");
            }
        } catch (err) {
            console.error("Network Error deleting course:", err);
        }
        return;
    }

    // Duplicate course
    const duplicateBtn = event.target.closest('.dropdown-item[data-action="duplicate"]');
    if (duplicateBtn) {
        const courseCard = duplicateBtn.closest('.course-card');
        if (!courseCard) return;

        const courseId = courseCard.dataset.courseId;

        try {
            const response = await fetch(`/courses/${courseId}/duplicate`, {
                method: 'POST',
            });

            if (response.ok) {
                const data = await response.json().catch(() => null);
                const newId = data?.course?._id || data?.id;

                if (newId) {
                    const newCard = courseCard.cloneNode(true);
                    newCard.dataset.courseId = newId;

                    const link = newCard.querySelector('.course-card-link');
                    if (link) {
                        link.href = `/courses/${newId}`;
                    }

                    const titleSpan = newCard.querySelector('.course-card-text1');
                    if (titleSpan) {
                        titleSpan.textContent = data?.course?.title || `${titleSpan.textContent.trim()} (1)`;
                    }

                    const codeSpan = newCard.querySelector('.course-card-text2');
                    if (codeSpan && data?.course?.code) {
                        codeSpan.textContent = data.course.code;
                    }

                    const newDropdown = newCard.querySelector('.dropdown-container');
                    newDropdown?.classList.remove('visible');

                    courseCard.after(newCard);
                    document.getElementById('empty-courses-state')?.setAttribute('hidden', '');
                }

                if (data && Array.isArray(data.terms)) {
                    updateTermList(data.terms);
                }
            } else {
                alert("Something went wrong duplicating the course. Please try again later.");
            }
        } catch (err) {
            console.error("Network Error duplicating course:", err);
        }
        return;
    }

    // Click outside dropdown closes open dropdowns
    if (!event.target.closest('.options-wrapper')) {
        document.querySelectorAll('.dropdown-container.visible').forEach((dropdown) => {
            dropdown.classList.remove('visible');
        });
    }
});

