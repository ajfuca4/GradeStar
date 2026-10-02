function initCalendar(calendarCard) {
  if (!calendarCard) return;

  const endpoint = calendarCard.dataset.endpoint || `${window.location.pathname.replace(/\/$/, '')}/calendar`;
  const pageUrl = calendarCard.dataset.pageUrl || window.location.pathname;

  const monthLabel = calendarCard.querySelector('#calendar-month-label');
  const grid = calendarCard.querySelector('#calendar-grid');
  const prevBtn = calendarCard.querySelector('#calendar-prev-btn');
  const nextBtn = calendarCard.querySelector('#calendar-next-btn');
  const todayBtn = calendarCard.querySelector('#calendar-today-btn');

  const monthCache = new Map();
  let isNavigating = false;

  function buildCacheKey(year, month) {
    return `${endpoint}:${year}-${month}`;
  }

  function getFetchUrl(year, month) {
    const separator = endpoint.includes('?') ? '&' : '?';
    return `${endpoint}${separator}year=${year}&month=${month}`;
  }

  function getPageUrl(year, month) {
    const separator = pageUrl.includes('?') ? '&' : '?';
    return `${pageUrl}${separator}year=${year}&month=${month}`;
  }

  function renderCalendar(data) {
    if (!data) return;

    if (monthLabel) {
      monthLabel.textContent = data.label;
    }

    if (prevBtn && data.prev) {
      prevBtn.href = getPageUrl(data.prev.year, data.prev.month);
      prevBtn.dataset.year = String(data.prev.year);
      prevBtn.dataset.month = String(data.prev.month);
      prevBtn.setAttribute('aria-label', `Previous month (${data.prev.label})`);
    }

    if (nextBtn && data.next) {
      nextBtn.href = getPageUrl(data.next.year, data.next.month);
      nextBtn.dataset.year = String(data.next.year);
      nextBtn.dataset.month = String(data.next.month);
      nextBtn.setAttribute('aria-label', `Next month (${data.next.label})`);
    }

    if (todayBtn && data.today) {
      todayBtn.dataset.year = String(data.today.year);
      todayBtn.dataset.month = String(data.today.month);
      todayBtn.hidden = Boolean(data.isCurrentMonth);
    }

    if (grid && Array.isArray(data.weekdays) && Array.isArray(data.cells)) {
      grid.classList.add('calendar-loading');

      const fragment = document.createDocumentFragment();

      data.weekdays.forEach((weekday) => {
        const span = document.createElement('span');
        span.className = 'calendar-weekday';
        span.setAttribute('role', 'columnheader');
        span.textContent = weekday;
        fragment.appendChild(span);
      });

      data.cells.forEach((cell) => {
        const span = document.createElement('span');
        if (!cell) {
          span.className = 'calendar-day calendar-day-empty';
          span.setAttribute('aria-hidden', 'true');
        } else {
          span.className = `calendar-day${cell.isToday ? ' calendar-day-today' : ''}${cell.hasDue ? ' calendar-day-due' : ''}`;
          span.setAttribute('role', 'gridcell');
          span.setAttribute('tabindex', '0');
          if (cell.isToday) {
            span.setAttribute('aria-current', 'date');
          }
          const ariaParts = [cell.day];
          if (cell.isToday) ariaParts.push('today');
          if (cell.hasDue) ariaParts.push('has deadline');
          span.setAttribute('aria-label', ariaParts.join(', '));
          span.textContent = String(cell.day);
        }
        fragment.appendChild(span);
      });

      grid.replaceChildren(fragment);
      grid.classList.remove('calendar-loading');
    }
  }

  async function fetchCalendarData(year, month) {
    const key = buildCacheKey(year, month);
    if (monthCache.has(key)) {
      return monthCache.get(key);
    }

    const url = getFetchUrl(year, month);
    const response = await fetch(url, {
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to load calendar data: ${response.status}`);
    }

    const data = await response.json();
    monthCache.set(key, data);
    return data;
  }

  async function navigateCalendar(year, month, shouldPushState = true) {
    if (isNavigating) return;
    isNavigating = true;

    try {
      if (grid) grid.classList.add('calendar-loading');
      const data = await fetchCalendarData(year, month);
      renderCalendar(data);

      if (shouldPushState) {
        const newUrl = getPageUrl(data.year, data.month);
        window.history.pushState({ year: data.year, month: data.month }, '', newUrl);
      }
    } catch (error) {
      console.error('Error navigating calendar:', error);
      if (shouldPushState && year && month) {
        window.location.href = getPageUrl(year, month);
      }
    } finally {
      if (grid) grid.classList.remove('calendar-loading');
      isNavigating = false;
    }
  }

  // Handle previous, next, and today button clicks
  calendarCard.addEventListener('click', (event) => {
    const trigger = event.target.closest('#calendar-prev-btn, #calendar-next-btn, #calendar-today-btn');
    if (!trigger) return;

    event.preventDefault();
    const year = Number(trigger.dataset.year);
    const month = Number(trigger.dataset.month);

    if (Number.isInteger(year) && Number.isInteger(month)) {
      navigateCalendar(year, month, true);
    }
  });

  // Handle browser back and forward navigation
  window.addEventListener('popstate', () => {
    const params = new URLSearchParams(window.location.search);
    const year = params.get('year');
    const month = params.get('month');

    if (year && month) {
      navigateCalendar(Number(year), Number(month), false);
    } else if (todayBtn && todayBtn.dataset.year && todayBtn.dataset.month) {
      navigateCalendar(Number(todayBtn.dataset.year), Number(todayBtn.dataset.month), false);
    }
  });

  // Keyboard navigation when focus is inside the calendar
  calendarCard.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft' && (event.altKey || event.target.closest('.calendar-nav-btn'))) {
      event.preventDefault();
      prevBtn?.click();
    } else if (event.key === 'ArrowRight' && (event.altKey || event.target.closest('.calendar-nav-btn'))) {
      event.preventDefault();
      nextBtn?.click();
    }
  });
}

document.querySelectorAll('.calendar-card').forEach(initCalendar);
