/**
 * Progress — tracks lesson study status in localStorage.
 *
 * Statuses: "not_started" | "in_progress" | "completed"
 *
 * Shape in localStorage (key: "lesson_progress"):
 * {
 *   "networking-basics": { status: "completed", startedAt: ..., completedAt: ... },
 *   ...
 * }
 */
const Progress = (function () {
  const STORAGE_KEY = 'lesson_progress';

  function _load() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
    } catch {
      return {};
    }
  }

  function _save(data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }

  function getAll() {
    return _load();
  }

  function getStatus(lessonId) {
    const data = _load();
    return (data[lessonId] && data[lessonId].status) || 'not_started';
  }

  function markInProgress(lessonId) {
    const data = _load();
    if (!data[lessonId] || data[lessonId].status !== 'completed') {
      data[lessonId] = {
        ...(data[lessonId] || {}),
        status: 'in_progress',
        startedAt: data[lessonId]?.startedAt || new Date().toISOString()
      };
      _save(data);
    }
  }

  function markCompleted(lessonId) {
    const data = _load();
    data[lessonId] = {
      ...(data[lessonId] || {}),
      status: 'completed',
      completedAt: new Date().toISOString()
    };
    _save(data);
  }

  function reset(lessonId) {
    const data = _load();
    delete data[lessonId];
    _save(data);
  }

  function resetAll() {
    localStorage.removeItem(STORAGE_KEY);
  }

  return { getAll, getStatus, markInProgress, markCompleted, reset, resetAll };
})();
