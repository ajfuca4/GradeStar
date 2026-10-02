const { describe, it } = require('node:test');
const assert = require('node:assert/strict');
const {
  WEEKDAYS,
  resolveCalendarDate,
  parseCalendarQuery,
  buildCalendarGrid,
} = require('./calendar-service');

describe('calendar-service: parseCalendarQuery', () => {
  it('parses valid year and month query parameters', () => {
    const date = parseCalendarQuery({ year: '2026', month: '11' });
    assert.ok(date instanceof Date);
    assert.equal(date.getFullYear(), 2026);
    assert.equal(date.getMonth(), 10);
    assert.equal(date.getDate(), 1);
  });

  it('accepts numeric values as well', () => {
    const date = parseCalendarQuery({ year: 2027, month: 3 });
    assert.ok(date instanceof Date);
    assert.equal(date.getFullYear(), 2027);
    assert.equal(date.getMonth(), 2);
  });

  it('returns undefined for missing or invalid query values', () => {
    assert.equal(parseCalendarQuery({}), undefined);
    assert.equal(parseCalendarQuery(null), undefined);
    assert.equal(parseCalendarQuery({ year: 'invalid', month: '5' }), undefined);
    assert.equal(parseCalendarQuery({ year: '2026', month: '0' }), undefined);
    assert.equal(parseCalendarQuery({ year: '2026', month: '13' }), undefined);
    assert.equal(parseCalendarQuery({ year: '1800', month: '5' }), undefined);
    assert.equal(parseCalendarQuery({ year: '3000', month: '5' }), undefined);
  });
});

describe('calendar-service: resolveCalendarDate', () => {
  it('resolves Date instances without modification', () => {
    const original = new Date(2026, 5, 10);
    assert.equal(resolveCalendarDate(original), original);
  });

  it('resolves { year, month } objects', () => {
    const date = resolveCalendarDate({ year: 2026, month: 10 });
    assert.equal(date.getFullYear(), 2026);
    assert.equal(date.getMonth(), 9);
  });

  it('resolves date strings and timestamps', () => {
    const fromStr = resolveCalendarDate('2026-10-15T00:00:00Z');
    assert.ok(fromStr instanceof Date);
    assert.equal(Number.isNaN(fromStr.getTime()), false);
  });

  it('falls back to default fallback for invalid inputs', () => {
    const fallback = new Date(2025, 0, 1);
    assert.equal(resolveCalendarDate('invalid', fallback), fallback);
    assert.equal(resolveCalendarDate(null, fallback), fallback);
  });
});

describe('calendar-service: buildCalendarGrid', () => {
  it('constructs month cells with weekday headers and due dates', () => {
    const fixedDate = new Date(2026, 9, 1); // October 2026
    const dueDates = [new Date(2026, 9, 15)];

    const calendar = buildCalendarGrid({ dueDates, targetDate: fixedDate });
    assert.equal(calendar.label, 'October 2026');
    assert.equal(calendar.weekdays.length, 7);

    const dueCell = calendar.cells.find((c) => c && c.day === 15);
    assert.ok(dueCell);
    assert.equal(dueCell.hasDue, true);
  });

  it('handles positional arguments (dueDates, targetDate, today)', () => {
    const targetDate = new Date(2026, 9, 1);
    const today = new Date(2026, 9, 10);
    const dueDates = [new Date(2026, 9, 20)];

    const calendar = buildCalendarGrid(dueDates, targetDate, today);
    assert.equal(calendar.isCurrentMonth, true);
    const day10Cell = calendar.cells.find((c) => c && c.day === 10);
    assert.equal(day10Cell.isToday, true);

    const day20Cell = calendar.cells.find((c) => c && c.day === 20);
    assert.equal(day20Cell.hasDue, true);
  });

  it('calculates prev and next month metadata correctly including year rollovers', () => {
    const dec = new Date(2026, 11, 1);
    const decCal = buildCalendarGrid([], dec);
    assert.deepEqual(decCal.prev, { year: 2026, month: 11, label: 'November 2026' });
    assert.deepEqual(decCal.next, { year: 2027, month: 1, label: 'January 2027' });

    const jan = new Date(2026, 0, 1);
    const janCal = buildCalendarGrid([], jan);
    assert.deepEqual(janCal.prev, { year: 2025, month: 12, label: 'December 2025' });
    assert.deepEqual(janCal.next, { year: 2026, month: 2, label: 'February 2026' });
  });

  it('correctly sets isToday only when viewing current month', () => {
    const today = new Date(2026, 9, 5);
    const oct = new Date(2026, 9, 1);
    const nov = new Date(2026, 10, 1);

    const octCal = buildCalendarGrid([], oct, today);
    assert.equal(octCal.isCurrentMonth, true);
    assert.equal(octCal.cells.find((c) => c && c.day === 5).isToday, true);

    const novCal = buildCalendarGrid([], nov, today);
    assert.equal(novCal.isCurrentMonth, false);
    assert.equal(novCal.cells.find((c) => c && c.day === 5).isToday, false);
  });
});
