/**
 * daily.js — computes today's lesson and article based on current date.
 * Depends on: VOCABULARY (vocabulary.js), ARTICLES (articles.js)
 * No randomness — same day always returns the same content for all users.
 */
const Daily = (function () {
  const EPOCH = new Date('2025-01-01T00:00:00Z').getTime();
  const DAY_MS = 24 * 60 * 60 * 1000;
  const WORDS_PER_DAY = 13;

  // Simple deterministic shuffle using a seeded LCG — seed never changes
  // so the shuffled order is always the same (just a fixed permutation)
  function seededShuffle(arr) {
    const result = arr.slice();
    let seed = 42;
    function rand() {
      seed = (seed * 1664525 + 1013904223) & 0xffffffff;
      return (seed >>> 0) / 0x100000000;
    }
    for (let i = result.length - 1; i > 0; i--) {
      const j = Math.floor(rand() * (i + 1));
      [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
  }

  // Pre-compute once: shuffled vocabulary (fixed order)
  let shuffledVocab = null;
  function getShuffled() {
    if (!shuffledVocab) shuffledVocab = seededShuffle(VOCABULARY);
    return shuffledVocab;
  }

  function getDayIndex() {
    return Math.floor((Date.now() - EPOCH) / DAY_MS);
  }

  function getTotalDays() {
    return Math.ceil(VOCABULARY.length / WORDS_PER_DAY);
  }

  /**
   * Returns today's lesson object, shaped like a LESSONS entry.
   */
  function getDailyLesson() {
    const dayIdx = getDayIndex();
    const cycleDayIdx = dayIdx % getTotalDays();
    const vocab = getShuffled();

    const start = cycleDayIdx * WORDS_PER_DAY;
    // Wrap around if we go past the end
    let words = [];
    for (let i = 0; i < WORDS_PER_DAY; i++) {
      words.push(vocab[(start + i) % vocab.length]);
    }

    const today = new Date();
    const dateLabel = today.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    const shortDate = today.toLocaleDateString('en-US', { month: 'long', day: 'numeric' });

    // Determine level distribution
    const categories = [...new Set(words.map(w => w.category))];

    return {
      id: 'daily',
      title: `Daily Lesson — ${shortDate}`,
      dateLabel,
      description: `Today's ${WORDS_PER_DAY} words cover ${categories.join(', ')}.`,
      level: 'mixed',
      estimatedMinutes: 20,
      words,
      dayIndex: cycleDayIdx,
      totalDays: getTotalDays()
    };
  }

  /**
   * Returns today's article.
   */
  function getDailyArticle() {
    const dayIdx = getDayIndex();
    return ARTICLES[dayIdx % ARTICLES.length];
  }

  /**
   * Returns human-readable date string for today.
   */
  function getTodayLabel() {
    return new Date().toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  return { getDailyLesson, getDailyArticle, getDayIndex, getTodayLabel };
})();
