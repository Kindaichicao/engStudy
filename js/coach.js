/**
 * Coach — AI chat coach for the Business English plan.
 *
 * Two modes:
 *   - "scripted" (default): walks user through pre-defined scenario steps with
 *     keyword-based scoring. Works offline.
 *   - "ai":  uses user-provided Gemini or Groq API key for free conversation.
 *     The coach plays the role described in the scenario and gives feedback.
 *
 * Persists settings in localStorage; chat transcripts are saved on session end.
 */
(function () {
  // -----------------------------------------------------------------------
  // DOM
  // -----------------------------------------------------------------------
  const $ = (id) => document.getElementById(id);
  const chatEl = $("chat");
  const inputEl = $("input");
  const sendBtn = $("send-btn");
  const micBtn = $("mic-btn");
  const speakerBtn = $("speaker-btn");
  const lessonSelect = $("lesson-select");
  const scenarioSelect = $("scenario-select");
  const restartBtn = $("restart-btn");
  const modeButtons = document.querySelectorAll(".coach-mode-toggle button");
  const apiRow = $("api-key-row");
  const apiKeyInput = $("api-key");
  const apiProviderSel = $("api-provider");
  const expectedListEl = $("expected-list");
  const progressFillEl = $("progress-fill");
  const stepLabelEl = $("step-label");
  const scenarioInfoEl = $("scenario-info");

  // -----------------------------------------------------------------------
  // State
  // -----------------------------------------------------------------------
  const SETTINGS_KEY = "coach_settings";
  const settings = loadSettings();

  let state = {
    lessonId: null,
    scenario: null,
    step: 0,            // 0 = opener (waiting for user), 1 = after follow-up
    score: 0,
    matchedAll: new Set(),
    transcript: [],
    autoSpeak: settings.autoSpeak !== false,
    voiceEnabled: true,
    server: { configured: false, providers: [], defaultProvider: null, checked: false }
  };

  function loadSettings() {
    try {
      return JSON.parse(localStorage.getItem(SETTINGS_KEY)) || { mode: "scripted", autoSpeak: true };
    } catch {
      return { mode: "scripted", autoSpeak: true };
    }
  }
  function saveSettings() {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  }

  // -----------------------------------------------------------------------
  // Build lesson/scenario selectors
  // -----------------------------------------------------------------------
  function buildSelectors() {
    BUSINESS_LESSONS_INDEX.forEach(l => {
      const opt = document.createElement("option");
      opt.value = l.id;
      opt.textContent = `W${l.week}: ${l.title}`;
      lessonSelect.appendChild(opt);
    });
  }

  function populateScenarios(lessonId) {
    scenarioSelect.innerHTML = "";
    const lesson = BUSINESS_LESSONS_INDEX.find(l => l.id === lessonId);
    if (!lesson) return;
    lesson.scenarios.forEach(s => {
      const opt = document.createElement("option");
      opt.value = s.id;
      opt.textContent = s.title;
      scenarioSelect.appendChild(opt);
    });
  }

  // -----------------------------------------------------------------------
  // Rendering messages
  // -----------------------------------------------------------------------
  function addMessage(role, text, opts = {}) {
    const wrap = document.createElement("div");
    wrap.className = `msg ${role}`;
    const avatar = role === "user" ? "Y" : role === "coach" ? "AI" : "ℹ";
    const safe = text.replace(/[<>]/g, c => ({ "<": "&lt;", ">": "&gt;" }[c]));
    wrap.innerHTML = `
      <div class="msg-avatar">${avatar}</div>
      <div>
        <div class="msg-bubble">${safe}</div>
        ${opts.feedback ? renderFeedback(opts.feedback) : ""}
      </div>
    `;
    chatEl.appendChild(wrap);
    chatEl.scrollTop = chatEl.scrollHeight;
    state.transcript.push({ role, text, at: new Date().toISOString() });
    if (role === "coach" && state.autoSpeak) {
      Speech.speak(text, { rate: 0.95 });
    }
    return wrap;
  }

  function renderFeedback(fb) {
    const hits = (fb.hits || []).map(h => `<span>${h}</span>`).join("");
    const misses = (fb.misses || []).map(m => `<span>${m}</span>`).join("");
    return `
      <div class="msg-feedback">
        <div>Score: <span class="score">${fb.score}/100</span> — ${fb.label || ""}</div>
        ${hits ? `<div class="hits"><strong>You used:</strong> ${hits}</div>` : ""}
        ${misses ? `<div class="misses"><strong>Missing:</strong> ${misses}</div>` : ""}
        ${fb.tip ? `<div class="tip">💡 ${fb.tip}</div>` : ""}
      </div>
    `;
  }

  // -----------------------------------------------------------------------
  // Scoring (scripted mode)
  // -----------------------------------------------------------------------
  function scoreResponse(userText, expected) {
    const norm = userText.toLowerCase();
    const wordCount = norm.split(/\s+/).filter(Boolean).length;
    const hits = expected.filter(e => norm.includes(e.toLowerCase()));
    const misses = expected.filter(e => !norm.includes(e.toLowerCase()));

    let phrasePct = expected.length === 0 ? 0 : (hits.length / expected.length) * 100;
    // Length bonus / penalty
    let lengthBonus = 0;
    if (wordCount >= 15) lengthBonus = 15;
    else if (wordCount >= 8) lengthBonus = 8;
    else if (wordCount < 4) lengthBonus = -10;

    let score = Math.round(Math.min(100, Math.max(0, phrasePct * 0.85 + lengthBonus)));

    let label, tip;
    if (score >= 80) {
      label = "Excellent! 🎯";
      tip = "Great use of business phrasing. Keep going.";
    } else if (score >= 60) {
      label = "Good 👍";
      tip = "Solid response. Try to weave in the missing phrases below for more natural Business English.";
    } else if (score >= 40) {
      label = "Getting there";
      tip = "Try to use more of the target phrases and explain in 2–3 sentences.";
    } else {
      label = "Let's try again";
      tip = "Re-read the useful phrases section and try to use 2–3 of them in your next answer.";
    }

    return { score, hits, misses, label, tip, wordCount };
  }

  // -----------------------------------------------------------------------
  // Conversation flow (scripted)
  // -----------------------------------------------------------------------
  function startScenarioScripted() {
    state.step = 0;
    state.score = 0;
    state.matchedAll = new Set();
    state.transcript = [];
    chatEl.innerHTML = "";
    if (!state.scenario) return;

    addMessage("system", `Scenario: ${state.scenario.title}. ${state.scenario.setup}`);
    addMessage("coach", state.scenario.coachOpener);
    updateSidebar();
  }

  function handleUserScripted(text) {
    if (!state.scenario) return;
    const expected = state.step === 0 ? state.scenario.expectedPhrases : state.scenario.expectedPhrases2;
    const fb = scoreResponse(text, expected || []);
    fb.hits.forEach(h => state.matchedAll.add(h));

    // Re-render last user msg with feedback
    const lastUser = chatEl.querySelector(".msg.user:last-of-type");
    if (lastUser) {
      const bubbleWrap = lastUser.querySelector("div:nth-child(2)");
      bubbleWrap.insertAdjacentHTML("beforeend", renderFeedback(fb));
      chatEl.scrollTop = chatEl.scrollHeight;
    }

    state.score = Math.max(state.score, fb.score);

    if (state.step === 0) {
      state.step = 1;
      setTimeout(() => {
        addMessage("coach", state.scenario.followUp);
        updateSidebar();
      }, 500);
    } else {
      const final = Math.round((state.score + fb.score) / 2);
      setTimeout(() => {
        let close;
        if (final >= 80) close = `Outstanding! Final score: ${final}/100. You sound fluent and confident — ready for the real thing.`;
        else if (final >= 60) close = `Nice work. Final score: ${final}/100. Try this scenario one more time using the phrases you missed.`;
        else close = `Final score: ${final}/100. Re-read the lesson's "Useful Phrases" section, then try this scenario again.`;
        addMessage("coach", close);
        addMessage("system", `Scenario complete. Score saved. Click "Restart scenario" to try again or pick a different one.`);
        BusinessProgress.recordScenarioAttempt(state.lessonId, state.scenario.id, final);
        BusinessProgress.pushChatLog({
          lessonId: state.lessonId,
          scenarioId: state.scenario.id,
          score: final,
          transcript: state.transcript
        });
        updateSidebar();
      }, 500);
    }
  }

  // -----------------------------------------------------------------------
  // AI mode — prefers the Node server proxy (key in .env). If the server is
  // not configured, falls back to a direct browser call with a user-provided
  // key. Scripted mode is unaffected.
  // -----------------------------------------------------------------------
  async function probeServer() {
    try {
      const r = await fetch("/api/coach/health", { cache: "no-store" });
      if (!r.ok) throw new Error(`HTTP ${r.status}`);
      const j = await r.json();
      state.server = { ...j, checked: true };
    } catch {
      state.server = { configured: false, providers: [], defaultProvider: null, checked: true };
    }
    refreshApiKeyVisibility();
  }

  async function callAI(userText) {
    const systemPrompt = buildSystemPrompt();
    const messages = buildMessagesForAI(systemPrompt, userText);

    addMessage("system", "Coach is thinking…");
    const thinkingEl = chatEl.querySelector(".msg.system:last-of-type");

    const useServer = state.server.configured;
    const provider = useServer
      ? (settings.apiProvider && state.server.providers.includes(settings.apiProvider)
          ? settings.apiProvider
          : state.server.defaultProvider)
      : (settings.apiProvider || "gemini");

    if (!useServer && !settings.apiKey) {
      thinkingEl?.remove();
      addMessage("system", "No server key found. Paste your own API key in the sidebar, or run the Node server (see README) so the key stays in .env.");
      return;
    }

    try {
      const reply = useServer
        ? await callServerProxy(provider, messages)
        : (provider === "groq"
            ? await callGroq(settings.apiKey, messages)
            : await callGemini(settings.apiKey, messages));
      thinkingEl?.remove();
      addMessage("coach", reply);
    } catch (e) {
      thinkingEl?.remove();
      addMessage("system", `Error calling ${provider}${useServer ? " via server" : ""}: ${e.message}.`);
    }
  }

  async function callServerProxy(provider, messages) {
    const r = await fetch("/api/coach/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ provider, messages })
    });
    const j = await r.json().catch(() => ({}));
    if (!r.ok) throw new Error(j.error || `HTTP ${r.status}`);
    return (j.reply || "").trim() || "(no response)";
  }

  function buildSystemPrompt() {
    const scenario = state.scenario;
    return `You are an English-speaking business coach for a software developer.
Your job is to roleplay a workplace scenario and help the learner practice Business English speaking.

Scenario title: ${scenario ? scenario.title : "open practice"}
Setup: ${scenario ? scenario.setup : "Free conversation about software work."}
You play the OTHER person (e.g. manager, colleague, interviewer). The learner is "the developer".

Style rules:
- Keep replies SHORT (1–3 sentences). Ask follow-up questions.
- After the learner replies, briefly give 1 line of constructive feedback in brackets, e.g. [Tip: try saying "I'm a bit blocked on..." instead of "I have problem"].
- Use everyday business English. Be encouraging.
- If the learner uses unnatural phrasing, suggest the natural version.
- Stay in character; do NOT break the scenario unless they ask to stop.`;
  }

  function buildMessagesForAI(system, userText) {
    const history = state.transcript
      .filter(t => t.role === "user" || t.role === "coach")
      .map(t => ({ role: t.role === "coach" ? "assistant" : "user", content: t.text }));
    return [
      { role: "system", content: system },
      ...history,
      { role: "user", content: userText }
    ];
  }

  async function callGroq(key, messages) {
    const r = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${key}`
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages,
        temperature: 0.7,
        max_tokens: 240
      })
    });
    if (!r.ok) throw new Error(`HTTP ${r.status}`);
    const j = await r.json();
    return j.choices?.[0]?.message?.content?.trim() || "(no response)";
  }

  async function callGemini(key, messages) {
    // Convert OpenAI-style messages to Gemini contents
    const system = messages.find(m => m.role === "system")?.content || "";
    const conv = messages.filter(m => m.role !== "system");
    const contents = conv.map(m => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.content }]
    }));
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${encodeURIComponent(key)}`;
    const r = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: system }] },
        contents,
        generationConfig: { temperature: 0.7, maxOutputTokens: 240 }
      })
    });
    if (!r.ok) {
      const t = await r.text();
      throw new Error(`HTTP ${r.status}: ${t.slice(0, 120)}`);
    }
    const j = await r.json();
    return j.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || "(no response)";
  }

  // -----------------------------------------------------------------------
  // Sidebar / progress
  // -----------------------------------------------------------------------
  function updateSidebar() {
    if (!state.scenario) {
      expectedListEl.innerHTML = "";
      progressFillEl.style.width = "0%";
      stepLabelEl.textContent = "—";
      scenarioInfoEl.textContent = "Pick a lesson and scenario to start.";
      return;
    }
    scenarioInfoEl.textContent = state.scenario.setup;
    const targets = (state.scenario.expectedPhrases || []).concat(state.scenario.expectedPhrases2 || []);
    const unique = Array.from(new Set(targets));
    expectedListEl.innerHTML = unique.map(t => {
      const matched = state.matchedAll.has(t);
      return `<li class="${matched ? "matched" : ""}">${matched ? "✓ " : ""}${t}</li>`;
    }).join("");
    const totalSteps = 2;
    progressFillEl.style.width = `${(state.step / totalSteps) * 100}%`;
    stepLabelEl.textContent = state.step === 0 ? "Coach is waiting for your reply" :
                               state.step === 1 ? "Round 2 — follow-up" :
                               "Done";
  }

  // -----------------------------------------------------------------------
  // Send handler
  // -----------------------------------------------------------------------
  function send() {
    const text = inputEl.value.trim();
    if (!text) return;
    addMessage("user", text);
    inputEl.value = "";
    inputEl.style.height = "auto";

    if (!state.scenario && settings.mode === "scripted") {
      addMessage("system", "Pick a lesson and scenario first, or switch to AI mode for free chat.");
      return;
    }

    if (settings.mode === "scripted") {
      handleUserScripted(text);
    } else {
      callAI(text);
    }
  }

  // -----------------------------------------------------------------------
  // Speech recognition
  // -----------------------------------------------------------------------
  let recognition = null;
  let listening = false;
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (SR) {
    recognition = new SR();
    recognition.lang = "en-US";
    recognition.continuous = false;
    recognition.interimResults = true;

    recognition.onresult = (event) => {
      let interim = "";
      let finalText = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const t = event.results[i][0].transcript;
        if (event.results[i].isFinal) finalText += t;
        else interim += t;
      }
      inputEl.value = (finalText + interim).trim();
      autoSizeInput();
    };
    recognition.onerror = (e) => {
      addMessage("system", `Mic error: ${e.error}. Type your reply instead.`);
      stopListening();
    };
    recognition.onend = () => stopListening();
  } else {
    micBtn.disabled = true;
    micBtn.title = "Speech recognition not supported in this browser. Try Chrome.";
    micBtn.style.opacity = "0.5";
  }

  function startListening() {
    if (!recognition || listening) return;
    listening = true;
    micBtn.classList.add("recording");
    micBtn.textContent = "⏹";
    try { recognition.start(); } catch (e) { stopListening(); }
  }
  function stopListening() {
    listening = false;
    micBtn.classList.remove("recording");
    micBtn.textContent = "🎙";
    try { recognition?.stop(); } catch {}
  }

  // -----------------------------------------------------------------------
  // Wire UI
  // -----------------------------------------------------------------------
  function setMode(mode) {
    settings.mode = mode;
    saveSettings();
    modeButtons.forEach(b => b.classList.toggle("active", b.dataset.mode === mode));
    refreshApiKeyVisibility();
  }

  function refreshApiKeyVisibility() {
    const isAi = settings.mode === "ai";
    const useServer = state.server.configured;
    apiRow.classList.toggle("visible", isAi && !useServer);

    const providerField = document.getElementById("provider-field");
    if (providerField) providerField.style.display = isAi ? "" : "none";

    const statusEl = document.getElementById("ai-status");
    if (!statusEl) return;
    if (!isAi) {
      statusEl.textContent = "";
      statusEl.style.display = "none";
      return;
    }
    statusEl.style.display = "block";
    if (!state.server.checked) {
      statusEl.textContent = "Checking server…";
      statusEl.className = "coach-helper";
    } else if (useServer) {
      const provs = state.server.providers.join(" + ");
      statusEl.innerHTML = `<span style="color:#047857;font-weight:600;">● Server connected</span> — using <strong>${provs}</strong> (key in .env, never sent from your browser).`;
      statusEl.className = "coach-helper";
    } else {
      statusEl.innerHTML = `<span style="color:#B91C1C;font-weight:600;">● No server key</span> — paste a key below, or run <code>npm start</code> with a key in <code>.env</code>.`;
      statusEl.className = "coach-helper";
    }

    // If using server, also reflect available providers in the dropdown
    if (useServer) {
      const allowed = new Set(state.server.providers);
      Array.from(apiProviderSel.options).forEach(o => { o.disabled = !allowed.has(o.value); });
      if (!allowed.has(apiProviderSel.value) && state.server.defaultProvider) {
        apiProviderSel.value = state.server.defaultProvider;
        settings.apiProvider = state.server.defaultProvider;
        saveSettings();
      }
    } else {
      Array.from(apiProviderSel.options).forEach(o => { o.disabled = false; });
    }
  }

  function applyScenarioFromSelectors() {
    state.lessonId = lessonSelect.value;
    populateScenarios(state.lessonId);

    // restore from URL params if matching, otherwise default to first
    const params = new URLSearchParams(location.search);
    if (params.get("scenario")) scenarioSelect.value = params.get("scenario");

    const lesson = BUSINESS_LESSONS_INDEX.find(l => l.id === state.lessonId);
    if (!lesson) return;
    state.scenario = lesson.scenarios.find(s => s.id === scenarioSelect.value) || lesson.scenarios[0];
    BusinessProgress.markInProgress(state.lessonId);
    if (settings.mode === "scripted") startScenarioScripted();
    else freshChatGreeting();
  }

  function freshChatGreeting() {
    chatEl.innerHTML = "";
    state.transcript = [];
    state.step = 0;
    state.matchedAll = new Set();
    addMessage("system", `AI mode — ${state.scenario ? state.scenario.title : "free conversation"}.`);
    if (state.scenario) addMessage("coach", state.scenario.coachOpener);
    updateSidebar();
  }

  function autoSizeInput() {
    inputEl.style.height = "auto";
    inputEl.style.height = Math.min(inputEl.scrollHeight, 160) + "px";
  }

  // Bind
  sendBtn.addEventListener("click", send);
  inputEl.addEventListener("input", autoSizeInput);
  inputEl.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  });
  micBtn.addEventListener("click", () => listening ? stopListening() : startListening());
  speakerBtn.addEventListener("click", () => {
    state.autoSpeak = !state.autoSpeak;
    settings.autoSpeak = state.autoSpeak;
    saveSettings();
    speakerBtn.textContent = state.autoSpeak ? "🔊" : "🔇";
    if (!state.autoSpeak) Speech.cancel();
  });
  restartBtn.addEventListener("click", () => {
    if (settings.mode === "scripted") startScenarioScripted();
    else freshChatGreeting();
  });
  lessonSelect.addEventListener("change", applyScenarioFromSelectors);
  scenarioSelect.addEventListener("change", () => {
    const lesson = BUSINESS_LESSONS_INDEX.find(l => l.id === state.lessonId);
    state.scenario = lesson?.scenarios.find(s => s.id === scenarioSelect.value);
    if (settings.mode === "scripted") startScenarioScripted();
    else freshChatGreeting();
  });
  modeButtons.forEach(b => b.addEventListener("click", () => {
    setMode(b.dataset.mode);
    if (state.scenario) {
      if (b.dataset.mode === "scripted") startScenarioScripted();
      else freshChatGreeting();
    }
  }));

  apiKeyInput.addEventListener("input", () => {
    settings.apiKey = apiKeyInput.value.trim();
    saveSettings();
  });
  apiProviderSel.addEventListener("change", () => {
    settings.apiProvider = apiProviderSel.value;
    saveSettings();
  });

  // -----------------------------------------------------------------------
  // Init
  // -----------------------------------------------------------------------
  function init() {
    buildSelectors();
    setMode(settings.mode || "scripted");
    speakerBtn.textContent = state.autoSpeak ? "🔊" : "🔇";
    apiKeyInput.value = settings.apiKey || "";
    apiProviderSel.value = settings.apiProvider || "gemini";

    // Restore lesson/scenario from URL or pick first
    const params = new URLSearchParams(location.search);
    const lessonParam = params.get("lesson");
    if (lessonParam && BUSINESS_LESSONS_INDEX.find(l => l.id === lessonParam)) {
      lessonSelect.value = lessonParam;
    } else if (BUSINESS_LESSONS_INDEX.length) {
      lessonSelect.value = BUSINESS_LESSONS_INDEX[0].id;
    }
    applyScenarioFromSelectors();

    // Probe the Node server in the background — auto-enables server mode if a
    // key is configured in .env, so the user never has to paste a key.
    probeServer();
  }
  init();
})();
