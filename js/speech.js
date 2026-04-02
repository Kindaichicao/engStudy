const Speech = (function () {
  let cachedVoices = [];
  let supported = 'speechSynthesis' in window;

  if (supported) {
    // Load voices — Chrome loads them asynchronously
    const loadVoices = () => {
      cachedVoices = window.speechSynthesis.getVoices();
    };
    loadVoices();
    window.speechSynthesis.addEventListener('voiceschanged', loadVoices);
  }

  function getPreferredVoice() {
    // Prefer a local en-US voice for natural sound
    const local = cachedVoices.find(v => v.lang === 'en-US' && v.localService);
    if (local) return local;
    // Fall back to any en-US
    return cachedVoices.find(v => v.lang.startsWith('en')) || null;
  }

  return {
    supported,

    speak(text, options = {}) {
      if (!supported) {
        options.onError?.('not-supported');
        return;
      }

      // Cancel any in-progress utterance
      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = options.lang || 'en-US';
      utterance.rate = options.rate != null ? options.rate : 0.85;
      utterance.pitch = options.pitch != null ? options.pitch : 1.0;
      utterance.volume = options.volume != null ? options.volume : 1.0;

      const voice = getPreferredVoice();
      if (voice) utterance.voice = voice;

      utterance.onstart = () => options.onStart?.();
      utterance.onend = () => options.onEnd?.();
      utterance.onerror = (e) => options.onError?.(e.error);

      window.speechSynthesis.speak(utterance);
    },

    cancel() {
      if (supported) window.speechSynthesis.cancel();
    }
  };
})();
