(function () {
  const params = new URLSearchParams(location.search);
  const articleId = params.get('id');
  const article = ARTICLES.find(a => a.id === articleId);

  if (!article) {
    location.href = 'index.html';
    return;
  }

  document.title = article.title + ' — TechEnglish';

  // ===== Build word lookup map =====
  const wordMap = {}; // wordId -> WordEntry
  VOCABULARY.forEach(w => {
    wordMap[w.id] = w;
  });

  // Collect all annotated word ids for this article
  const annotatedIds = new Set();
  Object.values(article.annotations).forEach(ids => ids.forEach(id => annotatedIds.add(id)));

  // ===== Render header =====
  const date = new Date(article.publishDate).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric'
  });

  const tagsHtml = article.tags.map(t => `<span class="badge badge-tag">${t}</span>`).join('');

  document.getElementById('article-tags').innerHTML = tagsHtml;
  document.getElementById('article-title').textContent = article.title;
  document.getElementById('article-date').textContent = date;
  document.getElementById('article-read-time').textContent = `${article.readingMinutes} min read`;
  document.getElementById('article-summary').textContent = article.summary;

  // ===== Render body =====
  const bodyEl = document.getElementById('article-body');
  article.paragraphs.forEach((para, i) => {
    const annotationsForPara = article.annotations[i] || [];
    const annotated = annotateParagraph(para, annotationsForPara);
    const p = document.createElement('p');
    p.className = 'article-paragraph';
    p.innerHTML = annotated;
    bodyEl.appendChild(p);
  });

  // ===== Render vocabulary list (mobile) =====
  const pillList = document.getElementById('vocab-pill-list');
  annotatedIds.forEach(wordId => {
    const word = wordMap[wordId];
    if (!word) return;
    const pill = document.createElement('button');
    pill.className = 'vocab-pill';
    pill.textContent = word.word;
    pill.addEventListener('click', () => {
      // Scroll to first occurrence in article
      const firstSpan = bodyEl.querySelector(`[data-word-id="${wordId}"]`);
      if (firstSpan) {
        firstSpan.scrollIntoView({ behavior: 'smooth', block: 'center' });
        setTimeout(() => Tooltip.show(wordId, firstSpan), 300);
      } else {
        Tooltip.show(wordId, pill);
      }
    });
    pillList.appendChild(pill);
  });

  // ===== Render sidebar (desktop) =====
  const sidebarList = document.getElementById('article-sidebar-list');
  annotatedIds.forEach(wordId => {
    const word = wordMap[wordId];
    if (!word) return;
    const item = document.createElement('div');
    item.className = 'article-sidebar-word';
    item.innerHTML = `
      <span>${word.word}</span>
      <span class="article-sidebar-phonetic">${word.phonetic}</span>
    `;
    item.addEventListener('click', () => {
      const firstSpan = bodyEl.querySelector(`[data-word-id="${wordId}"]`);
      if (firstSpan) {
        firstSpan.scrollIntoView({ behavior: 'smooth', block: 'center' });
        setTimeout(() => Tooltip.show(wordId, firstSpan), 300);
      } else {
        Tooltip.show(wordId, item);
      }
    });
    sidebarList.appendChild(item);
  });

  // ===== Event delegation for annotated word clicks =====
  bodyEl.addEventListener('click', (e) => {
    const span = e.target.closest('.annotated-word');
    if (!span) return;
    e.stopPropagation();
    const wordId = span.dataset.wordId;
    if (wordId) Tooltip.show(wordId, span);
  });

  bodyEl.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      const span = e.target.closest('.annotated-word');
      if (!span) return;
      e.preventDefault();
      const wordId = span.dataset.wordId;
      if (wordId) Tooltip.show(wordId, span);
    }
  });

  // ===== Article navigation =====
  const currentIndex = ARTICLES.findIndex(a => a.id === articleId);
  const prevArticle = ARTICLES[currentIndex - 1];
  const nextArticle = ARTICLES[currentIndex + 1];

  const prevBtn = document.getElementById('btn-prev-article');
  const nextBtn = document.getElementById('btn-next-article');

  if (prevArticle && prevBtn) {
    prevBtn.href = `article.html?id=${prevArticle.id}`;
    prevBtn.textContent = `← ${prevArticle.title}`;
    prevBtn.style.display = '';
  } else if (prevBtn) {
    prevBtn.style.display = 'none';
  }

  if (nextArticle && nextBtn) {
    nextBtn.href = `article.html?id=${nextArticle.id}`;
    nextBtn.textContent = `${nextArticle.title} →`;
    nextBtn.style.display = '';
  } else if (nextBtn) {
    nextBtn.style.display = 'none';
  }

  // ===== Annotation injector =====
  function annotateParagraph(text, wordIds) {
    if (!wordIds.length) return escapeHtml(text);

    // Build reverse map: lowercase word string -> wordId
    const reverseMap = {};
    wordIds.forEach(id => {
      const word = wordMap[id];
      if (!word) return;
      reverseMap[word.word.toLowerCase()] = id;
      // Handle exact-case for acronyms like "DNS", "HTTP"
      reverseMap[word.word] = id;
    });

    // Sort by display word length descending (prevent partial matches)
    const sortedWords = wordIds
      .map(id => wordMap[id])
      .filter(Boolean)
      .sort((a, b) => b.word.length - a.word.length);

    const patterns = sortedWords.map(w => escapeRegex(w.word));
    if (!patterns.length) return escapeHtml(text);

    const regex = new RegExp(`\\b(${patterns.join('|')})\\b`, 'gi');

    // We need to escape HTML in non-matched parts but leave matched parts as spans
    // Split by matches
    const result = [];
    let lastIndex = 0;
    let match;

    while ((match = regex.exec(text)) !== null) {
      // Escape text before match
      result.push(escapeHtml(text.slice(lastIndex, match.index)));
      // Add annotated span
      const wordId = reverseMap[match[1].toLowerCase()] || reverseMap[match[1]];
      if (wordId) {
        result.push(`<span class="annotated-word" data-word-id="${wordId}" tabindex="0" role="button" aria-label="See definition of ${match[1]}">${escapeHtml(match[1])}</span>`);
      } else {
        result.push(escapeHtml(match[1]));
      }
      lastIndex = match.index + match[0].length;
    }
    // Remaining text
    result.push(escapeHtml(text.slice(lastIndex)));

    return result.join('');
  }

  function escapeHtml(str) {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function escapeRegex(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

})();
