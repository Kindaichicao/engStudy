(function () {
  const params = new URLSearchParams(location.search);
  const lessonId = params.get('id');
  let lesson;

  if (lessonId === 'daily') {
    lesson = Daily.getDailyLesson();
  } else {
    const descriptor = LESSONS.find(l => l.id === lessonId);
    if (!descriptor) { location.href = 'index.html'; return; }
    lesson = hydrateLesson(descriptor);
  }

  if (!lesson || !lesson.words || lesson.words.length === 0) {
    location.href = 'index.html';
    return;
  }

  const STORAGE_KEY = 'visited_' + lessonId;
  let visited = JSON.parse(sessionStorage.getItem(STORAGE_KEY) || '{}');
  let currentIndex = 0;

  // Per-word state: how many example sentences have been revealed
  const revealedCounts = {};
  lesson.words.forEach(w => { revealedCounts[w.id] = 0; });

  // ===== DOM setup =====
  document.title = lesson.title + ' — TechEnglish';

  document.getElementById('lesson-title').textContent = lesson.title;
  const levelLabel = lesson.level === 'mixed' ? 'Daily' : lesson.level;
  document.getElementById('lesson-badge').textContent = levelLabel;
  document.getElementById('lesson-badge').className = 'badge badge-' + (lesson.level === 'mixed' ? 'primary' : lesson.level);

  // Update breadcrumb link for daily lesson
  const backLink = document.querySelector('.lesson-page-header a');
  if (backLink && lessonId === 'daily') {
    backLink.textContent = '← Home';
    backLink.href = 'index.html';
  }

  const wordStrip = document.getElementById('word-strip');
  const wordSidebar = document.getElementById('word-sidebar-list');
  const cardArea = document.getElementById('card-area');
  const progressInfo = document.getElementById('progress-info');

  // Build word chips (mobile strip) and sidebar items
  lesson.words.forEach((word, idx) => {
    const chip = document.createElement('button');
    chip.className = 'word-chip' + (idx === 0 ? ' active' : '');
    chip.textContent = word.word;
    chip.dataset.index = idx;
    chip.addEventListener('click', () => goTo(idx));
    wordStrip.appendChild(chip);

    const item = document.createElement('div');
    item.className = 'word-sidebar-item' + (idx === 0 ? ' active' : '');
    item.dataset.index = idx;
    item.innerHTML = `<span>${word.word}</span><span class="word-check">✓</span>`;
    item.addEventListener('click', () => goTo(idx));
    wordSidebar.appendChild(item);
  });

  // ===== RENDER CARD =====
  function renderCard(index) {
    const word = lesson.words[index];
    const revealedCount = revealedCounts[word.id];
    const revealedSentences = word.exampleSentences.slice(0, revealedCount);

    const examplesHtml = revealedSentences.map((s, i) => `
      <div class="example-sentence">
        <span class="example-num">${i + 1}.</span>
        <span>${annotateText(s)}</span>
      </div>
    `).join('');

    const examplesCountHtml = revealedCount > 0
      ? `<span class="examples-count">${revealedCount}</span>`
      : '';

    cardArea.innerHTML = `
      <div class="vocab-card">
        <div class="vocab-card-top">
          <div class="vocab-word">${word.word}</div>
          <div class="vocab-meta">
            <span class="vocab-phonetic">${word.phonetic}</span>
            <span class="vocab-pos">${word.partOfSpeech}</span>
            <button class="btn-listen" id="btn-listen" aria-label="Listen to pronunciation">
              <span class="listen-icon">🔊</span>
              <span class="sound-wave"><span></span><span></span><span></span></span>
              Listen
            </button>
          </div>
          ${word.vietnamese ? `<div class="vocab-vietnamese">🇻🇳 ${word.vietnamese}</div>` : ''}
        </div>

        <div class="vocab-card-body">
          <div class="practice-label">Type the word to practice</div>
          <div class="typing-area">
            <input
              type="text"
              class="typing-input"
              id="typing-input"
              placeholder="${word.word.toLowerCase().replace(/./g, '·')}"
              autocomplete="off"
              autocorrect="off"
              autocapitalize="off"
              spellcheck="false"
            >
            <button class="btn-submit" id="btn-submit">Check →</button>
          </div>
          <div class="practice-hint">Type the word above and press Enter or "Check"</div>
        </div>

        ${revealedCount > 0 ? `
        <div class="examples-section">
          <div class="examples-label">
            Example Sentences ${examplesCountHtml}
          </div>
          ${examplesHtml}
          <div style="margin-top:var(--space-3);">
            <button class="btn btn-outline btn-sm" id="btn-practice-more">
              ✍️ Type again for more examples
            </button>
          </div>
        </div>
        ` : ''}

        <div class="vocab-card-nav">
          <button class="btn-nav" id="btn-prev" ${index === 0 ? 'disabled' : ''}>
            ← Previous
          </button>
          <span class="nav-counter">${index + 1} / ${lesson.words.length}</span>
          <button class="btn-nav btn-skip" id="btn-skip">
            Skip ${index === lesson.words.length - 1 ? '→' : '→'}
          </button>
        </div>
      </div>
    `;

    updateStripAndSidebar(index);
    updateProgress(index);
    wireCardEvents(word, index);
  }

  function wireCardEvents(word, index) {
    const listenBtn = document.getElementById('btn-listen');
    const input = document.getElementById('typing-input');
    const submitBtn = document.getElementById('btn-submit');
    const skipBtn = document.getElementById('btn-skip');
    const prevBtn = document.getElementById('btn-prev');
    const practiceMoreBtn = document.getElementById('btn-practice-more');

    // Listen button
    listenBtn.addEventListener('click', () => {
      listenBtn.classList.add('is-speaking');
      Speech.speak(word.word, {
        onEnd: () => listenBtn.classList.remove('is-speaking'),
        onError: () => listenBtn.classList.remove('is-speaking')
      });
    });

    // Submit on Enter
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') checkAnswer(word, input, index);
    });

    submitBtn.addEventListener('click', () => checkAnswer(word, input, index));

    // Skip
    skipBtn.addEventListener('click', () => {
      markVisited(index);
      if (index < lesson.words.length - 1) {
        goTo(index + 1);
      } else {
        showComplete();
      }
    });

    // Previous
    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        if (index > 0) goTo(index - 1);
      });
    }

    // "Type again for more" button — show input area again
    if (practiceMoreBtn) {
      practiceMoreBtn.addEventListener('click', () => {
        const inputArea = cardArea.querySelector('.vocab-card-body');
        inputArea.style.display = '';
        practiceMoreBtn.closest('div').style.display = 'none';
        const inp = document.getElementById('typing-input');
        if (inp) { inp.value = ''; inp.focus(); }
      });
    }

    // Wire tooltip on example sentences
    wireAnnotatedWords();

    // Auto-focus input
    if (input) input.focus();
  }

  function checkAnswer(word, input, index) {
    const value = input.value.trim().toLowerCase();
    const correct = word.word.toLowerCase();

    if (value === correct) {
      input.classList.add('is-success');
      input.classList.remove('is-error');

      // Increment reveal counter (cycle if all shown)
      revealedCounts[word.id] =
        (revealedCounts[word.id] + 1) % word.exampleSentences.length;
      if (revealedCounts[word.id] === 0) revealedCounts[word.id] = word.exampleSentences.length;

      markVisited(index);

      // Re-render card (preserving revealed count)
      setTimeout(() => renderCard(index), 200);
    } else {
      input.classList.add('is-error');
      input.classList.remove('is-success');
      // Remove animation class so it can re-trigger
      setTimeout(() => {
        input.classList.remove('is-error');
        input.value = '';
        input.focus();
      }, 400);
    }
  }

  function annotateText(text) {
    // Build a map of all word ids from VOCABULARY
    const wordMap = {};
    VOCABULARY.forEach(w => {
      wordMap[w.word.toLowerCase()] = w.id;
      // Handle acronyms and mixed-case (DNS, HTTP, CI/CD, etc.)
      if (w.word !== w.word.toLowerCase()) {
        wordMap[w.word] = w.id;
      }
    });

    // Sort by length descending to avoid partial matches
    const sortedWords = Object.keys(wordMap).sort((a, b) => b.length - a.length);
    const escaped = sortedWords.map(w => w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
    const regex = new RegExp(`\\b(${escaped.join('|')})\\b`, 'gi');

    return text.replace(regex, (match) => {
      const id = wordMap[match.toLowerCase()] || wordMap[match];
      if (!id) return match;
      return `<span class="annotated-word" data-word-id="${id}" tabindex="0" role="button" aria-label="See definition of ${match}">${match}</span>`;
    });
  }

  function wireAnnotatedWords() {
    cardArea.querySelectorAll('.annotated-word').forEach(span => {
      span.addEventListener('click', (e) => {
        e.stopPropagation();
        const wordId = span.dataset.wordId;
        if (wordId) Tooltip.show(wordId, span);
      });
      span.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          const wordId = span.dataset.wordId;
          if (wordId) Tooltip.show(wordId, span);
        }
      });
    });
  }

  function markVisited(index) {
    visited[lesson.words[index].id] = true;
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(visited));
  }

  function updateStripAndSidebar(activeIndex) {
    document.querySelectorAll('.word-chip').forEach((chip, i) => {
      chip.classList.toggle('active', i === activeIndex);
      chip.classList.toggle('visited', !!visited[lesson.words[i].id]);
    });
    document.querySelectorAll('.word-sidebar-item').forEach((item, i) => {
      item.classList.toggle('active', i === activeIndex);
      item.classList.toggle('visited', !!visited[lesson.words[i].id]);
    });

    // Scroll active chip into view
    const activeChip = wordStrip.querySelector('.word-chip.active');
    if (activeChip) activeChip.scrollIntoView({ block: 'nearest', inline: 'center' });
  }

  function updateProgress(index) {
    const visitedCount = Object.keys(visited).length;
    progressInfo.textContent = `${visitedCount} of ${lesson.words.length} words practiced`;
  }

  function goTo(index) {
    currentIndex = index;
    renderCard(index);
  }

  function showComplete() {
    cardArea.innerHTML = `
      <div class="lesson-complete">
        <div class="lesson-complete-icon">🎉</div>
        <h2 class="lesson-complete-title">Lesson Complete!</h2>
        <p class="lesson-complete-subtitle">
          Great job! You've practiced all ${lesson.words.length} words in <strong>${lesson.title}</strong>.
        </p>
        <div style="display:flex;gap:var(--space-3);justify-content:center;flex-wrap:wrap;">
          <button class="btn btn-outline" onclick="location.reload()">Practice Again</button>
          <a href="index.html" class="btn btn-primary">Back to Home</a>
        </div>
      </div>
    `;
    progressInfo.textContent = `All ${lesson.words.length} words practiced!`;
  }

  // Initial render
  renderCard(0);

})();
