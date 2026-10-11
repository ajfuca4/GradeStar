const WEEKDAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

/**
 * Normalizes inputs (Date, timestamp, or {year, month}) into a Date instance.
 * @param {Date|string|number|object} value - Input date representation.
 * @param {Date} [fallback=new Date()] - Fallback if input is invalid.
 * @returns {Date} Normalized Date instance.
 */
function resolveCalendarDate(value, fallback = new Date()) {
  if (value instanceof Date && !Number.isNaN(value.getTime())) {
    return value;
  }
  if (typeof value === 'string' || typeof value === 'number') {
    const parsed = new Date(value);
    if (!Number.isNaN(parsed.getTime())) {
      return parsed;
    }
  }
  if (typeof value === 'object' && value !== null) {
    const y = Number(value.year);
    const m = Number(value.month);
    if (Number.isInteger(y) && Number.isInteger(m)) {
      const monthIndex = m >= 1 && m <= 12 ? m - 1 : m;
      return new Date(y, monthIndex, 1);
    }
  }
  return fallback;
}

/**
 * Parses 1-based year/month query params into a Date matching the first day of that month.
 * @param {object} [query={}] - URL query parameters.
 * @returns {Date|undefined} Validated Date, or undefined if invalid/missing.
 */
function parseCalendarQuery(query = {}) {
  if (!query || typeof query !== 'object') {
    return undefined;
  }
  const rawYear = Number(query.year);
  const rawMonth = Number(query.month);

  const hasValidYear = Number.isInteger(rawYear) && rawYear >= 1970 && rawYear <= 2100;
  const hasValidMonth = Number.isInteger(rawMonth) && rawMonth >= 1 && rawMonth <= 12;

  if (hasValidYear && hasValidMonth) {
    return new Date(rawYear, rawMonth - 1, 1);
  }
  return undefined;
}

/**
 * Computes calendar grid cells, due date indicators, and prev/next month metadata from a list of due dates.
 * @param {Array<Date|string>|object} optionsOrDueDates - Array of due dates or options object ({ dueDates, targetDate, today }).
 * @param {Date|string|number|object} [maybeTargetDate=new Date()] - Target month/year to construct.
 * @param {Date} [maybeToday=new Date()] - Reference date for today highlighting.
 * @returns {object} Calendar model with label, weekdays, cells, prev/next links, and today metadata.
 */
function buildCalendarGrid(optionsOrDueDates = [], maybeTargetDate = new Date(), maybeToday = new Date()) {
  let rawDueDates = [];
  let rawTargetDate = maybeTargetDate;
  let rawToday = maybeToday;

  if (Array.isArray(optionsOrDueDates)) {
    rawDueDates = optionsOrDueDates;
  } else if (typeof optionsOrDueDates === 'object' && optionsOrDueDates !== null) {
    rawDueDates = Array.isArray(optionsOrDueDates.dueDates) ? optionsOrDueDates.dueDates : [];
    if (optionsOrDueDates.targetDate !== undefined) rawTargetDate = optionsOrDueDates.targetDate;
    if (optionsOrDueDates.today !== undefined) rawToday = optionsOrDueDates.today;
  }

  const target = resolveCalendarDate(rawTargetDate);
  const current = resolveCalendarDate(rawToday);

  const year = target.getFullYear();
  const month = target.getMonth();
  const humanMonth = month + 1;

  const firstWeekday = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const validDueDates = rawDueDates
    .map((item) => (item instanceof Date ? item : new Date(item)))
    .filter((date) => !Number.isNaN(date.getTime()));

  const dueDays = new Set(
    validDueDates
      .filter((date) => date.getFullYear() === year && date.getMonth() === month)
      .map((date) => date.getDate())
  );

  const isCurrentMonth = current.getFullYear() === year && current.getMonth() === month;

  const cells = [];
  for (let index = 0; index < firstWeekday; index += 1) {
    cells.push(null);
  }
  for (let day = 1; day <= daysInMonth; day += 1) {
    cells.push({
      day,
      isToday: isCurrentMonth && day === current.getDate(),
      hasDue: dueDays.has(day),
    });
  }

  const prevDate = new Date(year, month - 1, 1);
  const nextDate = new Date(year, month + 1, 1);

  return {
    year,
    month: humanMonth,
    monthIndex: month,
    label: new Date(year, month, 1).toLocaleDateString('en-US', {
      month: 'long',
      year: 'numeric',
    }),
    isCurrentMonth,
    weekdays: WEEKDAYS,
    cells,
    prev: {
      year: prevDate.getFullYear(),
      month: prevDate.getMonth() + 1,
      label: prevDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
    },
    next: {
      year: nextDate.getFullYear(),
      month: nextDate.getMonth() + 1,
      label: nextDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
    },
    today: {
      year: current.getFullYear(),
      month: current.getMonth() + 1,
      day: current.getDate(),
    },
  };
}

module.exports = {
  WEEKDAYS,
  resolveCalendarDate,
  parseCalendarQuery,
  buildCalendarGrid,
};
