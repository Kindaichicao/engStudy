const Tooltip = (function () {
  let tooltipEl = null;
  let backdropEl = null;
  let currentAnchor = null;
  let listenBtn = null;

  function init() {
    // Create backdrop
    backdropEl = document.createElement('div');
    backdropEl.id = 'tooltip-backdrop';
    document.body.appendChild(backdropEl);

    // Create tooltip element
    tooltipEl = document.createElement('div');
    tooltipEl.id = 'word-tooltip';
    tooltipEl.setAttribute('role', 'dialog');
    tooltipEl.setAttribute('aria-modal', 'false');
    tooltipEl.setAttribute('aria-live', 'polite');
    tooltipEl.hidden = true;
    tooltipEl.innerHTML = `
      <div class="tooltip-header">
        <span class="tooltip-word" id="tt-word"></span>
        <button class="tooltip-close" aria-label="Close">&times;</button>
      </div>
      <div class="tooltip-meta">
        <span class="tooltip-phonetic" id="tt-phonetic"></span>
        <span class="tooltip-pos" id="tt-pos"></span>
        <button class="tooltip-listen" id="tt-listen">
          ▶ Listen
        </button>
      </div>
      <div class="tooltip-definition" id="tt-definition"></div>
      <div class="tooltip-vietnamese" id="tt-vietnamese"></div>
    `;
    document.body.appendChild(tooltipEl);

    listenBtn = tooltipEl.querySelector('#tt-listen');

    // Close button
    tooltipEl.querySelector('.tooltip-close').addEventListener('click', hide);

    // Listen button
    listenBtn.addEventListener('click', () => {
      const word = tooltipEl.querySelector('#tt-word').textContent;
      if (!word) return;
      listenBtn.classList.add('is-speaking');
      Speech.speak(word, {
        onEnd: () => listenBtn.classList.remove('is-speaking'),
        onError: () => listenBtn.classList.remove('is-speaking')
      });
    });

    // Backdrop click
    backdropEl.addEventListener('click', hide);

    // Keyboard
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !tooltipEl.hidden) hide();
    });

    // Outside click
    document.addEventListener('click', (e) => {
      if (
        !tooltipEl.hidden &&
        !tooltipEl.contains(e.target) &&
        !e.target.classList.contains('annotated-word')
      ) {
        hide();
      }
    }, { capture: false });
  }

  function findWord(wordId) {
    return VOCABULARY.find(w => w.id === wordId) || null;
  }

  function show(wordId, anchorEl) {
    const word = findWord(wordId);
    if (!word) return;

    tooltipEl.querySelector('#tt-word').textContent = word.word;
    tooltipEl.querySelector('#tt-phonetic').textContent = word.phonetic;
    tooltipEl.querySelector('#tt-pos').textContent = word.partOfSpeech;
    tooltipEl.querySelector('#tt-definition').textContent = word.definition;
    const vietEl = tooltipEl.querySelector('#tt-vietnamese');
    vietEl.textContent = word.vietnamese ? '🇻🇳 ' + word.vietnamese : '';
    vietEl.style.display = word.vietnamese ? '' : 'none';
    listenBtn.classList.remove('is-speaking');

    currentAnchor = anchorEl;
    tooltipEl.hidden = false;

    const isMobile = window.innerWidth < 640;

    if (isMobile) {
      tooltipEl.style.cssText = '';
      backdropEl.classList.add('is-visible');
    } else {
      backdropEl.classList.remove('is-visible');
      positionDesktop(anchorEl);
    }

    // Trigger CSS transition
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        tooltipEl.classList.add('is-visible');
      });
    });

    // Move focus to close button
    tooltipEl.querySelector('.tooltip-close').focus();
  }

  function positionDesktop(anchorEl) {
    const TOOLTIP_W = 300;
    const TOOLTIP_H = 180; // approximate
    const GAP = 8;

    const rect = anchorEl.getBoundingClientRect();
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const scrollX = window.scrollX;
    const scrollY = window.scrollY;

    let top = rect.bottom + scrollY + GAP;
    let left = rect.left + scrollX + rect.width / 2 - TOOLTIP_W / 2;

    // Don't overflow right
    if (left + TOOLTIP_W > scrollX + vw - 12) {
      left = scrollX + vw - TOOLTIP_W - 12;
    }
    // Don't overflow left
    if (left < scrollX + 12) {
      left = scrollX + 12;
    }
    // Flip above if not enough space below
    if (rect.bottom + TOOLTIP_H + GAP > vh) {
      top = rect.top + scrollY - TOOLTIP_H - GAP;
    }

    tooltipEl.style.position = 'absolute';
    tooltipEl.style.top = top + 'px';
    tooltipEl.style.left = left + 'px';
    tooltipEl.style.width = TOOLTIP_W + 'px';
  }

  function hide() {
    tooltipEl.classList.remove('is-visible');
    backdropEl.classList.remove('is-visible');
    Speech.cancel();
    listenBtn.classList.remove('is-speaking');
    setTimeout(() => {
      tooltipEl.hidden = true;
      if (currentAnchor) {
        currentAnchor.focus({ preventScroll: true });
        currentAnchor = null;
      }
    }, 150);
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  return { show, hide };
})();
